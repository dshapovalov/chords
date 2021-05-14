import { orderBy, indexOf } from 'lodash';

const chordsRegExp = new RegExp('((A|B|C|D|E|F|G|H)#?m?(dim)?7?9?(sus4)?)', 'g');
const basicWordsRegExp = new RegExp('(Куплет.+|Припев.+|К\\.:|П\\.:|Пр.:)', 'gi');
const spanRegExp = new RegExp('(.+<span class="chord">.+)', 'g');

export function resolveSongs(source) {
  const songs = source.map(song => {
    song.pureLyrics = song.lyrics;
    song.lyrics = mapChords(song.lyrics);

    return song;
  });

  return orderBy(songs, 'title');
}

export function mapChords(lyrics) {
  return lyrics.replace(chordsRegExp, '<span class="chord">$1</span>')
    .replace(basicWordsRegExp, '<span class="basic">$1</span>')
    .replace(spanRegExp, '<span class="chordRow">$1</span>')
}

const KEYS_LIST = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'H'];
const pureKeyRegExp = new RegExp('((A|B|C|D|E|F|G|H)#?)(\\S+)?');

function getIndex(i, up) {
  let nextIndex = up ? i + 1 : i - 1;
  return nextIndex > 11 ? 0 : nextIndex < 0 ? 11 : nextIndex;
}

function getPureKey(key) {
  const extracted = pureKeyRegExp.exec(key)
  const pureKey = extracted[1]
  const rest = extracted[3] || ''

  return { pureKey, rest }
}

export function changeKey(key, up) {
  const { pureKey, rest } = getPureKey(key)
  const index = indexOf(KEYS_LIST, pureKey)
  let nextIndex = getIndex(index, up)

  return KEYS_LIST[nextIndex] + rest
}

export function transpose(lyrics, up) {
  return lyrics.replace(chordsRegExp, (match) => changeKey(match, up))
}

export function setKey(targetKey, currentKey, currentLyrics) {
  let key = currentKey
  let lyrics = currentLyrics

  if (targetKey === currentKey) {
    return { key, lyrics }
  }

  const { pureKey } = getPureKey(targetKey)
  const { pureKey: pureKeyCurrent } = getPureKey(currentKey)
  const targetIndex = indexOf(KEYS_LIST, pureKey)
  const index = indexOf(KEYS_LIST, pureKeyCurrent)

  let count = targetIndex - index
  const up = count > 0;

  for (let i = 0; i < Math.abs(count); i++) {
    key = changeKey(key, up)
    lyrics = transpose(lyrics, up)
  }

  return { key, lyrics }
}

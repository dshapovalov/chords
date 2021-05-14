<template>
    <div class="lyricsLayout">
        <div class="keyLayout">
            <div class="keyRow" v-if="song.key">
                <div class="keyBlock" @click="switchKey(song.key)">
                    <i class="material-icons">mic</i>
                    <span>По умолчанию: <span class="keySpan">{{song.key}}</span></span>
                </div>
                <div v-if="song.altKeyValue" class="keyBlock altKey" @click="switchKey(song.altKeyValue)">
                    <i class="material-icons">mic</i>
                    <span>{{song.altKeyName}}: <span class="keySpan">{{song.altKeyValue}}</span></span>
                </div>
                <div v-if="song.altKeySecondValue" class="keyBlock altKey" @click="switchKey(song.altKeySecondValue)">
                   <i class="material-icons">mic</i>
                    <span>{{song.altKeySecondName}}: <span class="keySpan">{{song.altKeySecondValue}}</span></span>
                </div>
            </div>
            <div class="keyRow" v-if="song.key">
                <div class="keyManagement">
                    <i class="material-icons">sync</i>
                    <div class="keyButtons">
                        Сменить тональность:
                        <button @click="decreaseKey">-</button>
                        <span class="currentKey">{{ currentKey }}</span>
                        <button @click="increaseKey">+</button>
                    </div>
                </div>
            </div>
            <div class="addSong">
                <button class="primary middle">
                    <i class="material-icons">add</i>
                </button>
            </div>
        </div>
        <div class="lyricsContainer">
            <div class="title">
                {{song.title}}
                <div class="wrapper">
                    <div class="addToAgenda" @click="toogleShowOrder">
                            <i class="material-icons">addchart</i>
                    </div>
                    <div v-if="showOrder" class="agendaDropdown">
                        Добавить к программе:
                        <ul @click="addToAgenda">
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                        </ul>
                    </div>
                    <div class="message success" v-if="agendaSuccessMessage">
                        {{agendaSuccessMessage}}
                    </div>
                </div>
            </div>
            <div class="lyrics" v-html="lyrics"></div>
            <div class="editLyrics">
                <textarea name="lyrics" v-model="pureLyrics">
                </textarea>
            </div>
            <div class="editSong">
                <button class="warning middle">
                    <i class="material-icons">edit</i>
                </button>
            </div>
        </div>
    </div>
</template>
<script src="./Lyrics.js"></script>
<style src="./Lyrics.css"></style>

<template>
    <div class="listLayout" v-bind:class="{ collapsed: collapsed }">
        <div class="openList" @click="toogleList()">
            <i class="material-icons">list</i>
        </div>
        <div class="todaysList">
            <div class="todaysListTitle" @click="toogleList()">
                <i class="material-icons">today</i>
                <span>Программа:</span>
            </div>
            <ul class="songsList today">
                <li v-for="song in agenda"
                    v-bind:key="song.id*Math.random()"
                    :class="{active: song.id === activeSong.id}"
                    @click="openSong(song)"
                >
                    {{ song.title }}
                </li>
            </ul>
            <div class="toogleList" @click="toogleList()">
                <div class="allSongsTitle">
                    <i class="material-icons">list</i>
                    <span>Все песни:</span>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="allSongs">
            <ul class="songsList">
                <li v-for="song in songs"
                    v-bind:key="song.id"
                    :class="{active: song.id === activeSong.id}"
                    @click="openSong(song)"
                >
                    {{ song.title }}
                </li>
            </ul>
        </div>
    </div>
</template>
<script src="./List.js"></script>
<style src="./List.css"></style>

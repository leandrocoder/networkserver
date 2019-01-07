<template>
	<div class='home' v-if="app != null">
		<tabs :value="tabs" :active="currentServerIndex" @click='onClickTab' />
		<server v-if='creatingNew == false' ref='server' class="servercontainer" :app="app" :server="server" />
		<new-tab v-if='creatingNew == true' class="servercontainer" @add='createNewServer' />
		<msg-box ref='msgbox' />
	</div>
</template>

<script>

import Tabs from "./Tabs.vue";
import Server from "./Server.vue";
import NewTab from "./NewTab.vue";
import Path from 'path';
import FS from 'fs';

import MsgBox from './MessageBox.vue';

const remote = window.require('electron').remote;

export default {

	data: () => ({

		app:null,
		currentServerIndex:0,
		server:null,
		tabs:[],

		creatingNew:false
	}),
	
	components: {
		Tabs, Server, NewTab, MsgBox
	},

	mounted() {

		//this.$refs.msgbox.style.display = 'none';
		
		this.app = remote.getGlobal('app');

		this.app.on('message', (server, data, sender) => {
			if (this.server.id == server.id)
			{
				console.log('receive message', data);
				console.log(this.server.messageLog.length);
			}
		});

		this.updateTabs();

		this.currentServerIndex = 0;
		console.log('server length:', this.app.server.length);

		this.$nextTick(() => {
			this.updateServerData();
		});


	},

	methods: {

		msgBox: function()
		{
			this.$refs.msgBox[0].style.display = 'block';
		},

		updateTabs: function()
		{
			this.tabs = [];
			for (let i = 0; i < this.app.server.length; i++)
			{
				this.tabs.push(this.app.server[i].config.name);
			}
		},

		createNewServer: function(config)
		{
            this.app.addServer(config);
			this.updateTabs();
			this.$nextTick(() => {
				this.onClickTab(this.tabs.length - 1);		
			});
		},

		onClickTab: function(index)
		{
			console.log('click tab', index);
			this.creatingNew = false;

			if (index < 0)
			{
				this.creatingNew = true;
				this.server = null;
				this.currentServerIndex = -1;
				console.log('create new server');
			}
			else {
				
				this.currentServerIndex = index;
				this.updateServerData();
			}
		},

		updateServerData: function()
		{
			this.$nextTick(() => {

				this.server = this.app.server[this.currentServerIndex];
				this.$refs.server.selectedRoom = 0;
				this.$refs.server.selectedClient = -1;
				this.$refs.server.sendTarget = "[ all ]",
				this.$nextTick(() => {
					
					this.$refs.server.updateAll();
				});
			});
		}
	}

}
</script>

<style lang="scss" scoped>
	.home {

		.servercontainer {
			position:relative;
			height:calc(100vh - 40px);
			width:100vw;
			background-color: white;

			overflow-x: hidden;
			overflow-y: auto;
		}
	}
</style>

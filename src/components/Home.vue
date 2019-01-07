<template>
	<div class='home' v-if="app != null">
		<tabs :value="tabs" :active="currentServerIndex" @click='onClickTab' />
		<server v-if='creatingNew == false' ref='server' class="servercontainer" :app="app" :server="server" />
		<new-tab v-if='creatingNew == true' class="servercontainer" />
	</div>
</template>

<script>

import Tabs from "./Tabs.vue";
import Server from "./Server.vue";
import NewTab from "./NewTab.vue";
import Path from 'path';
import FS from 'fs';

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
		Tabs, Server, NewTab
	},

	mounted() {
		
		this.app = remote.getGlobal('app');

		this.app.on('message', (server, data, sender) => {
			if (this.server.id == server.id)
			{
				console.log('receive message', data);
				console.log(this.server.messageLog.length);
			}
		});

		this.tabs = [];
		for (let i = 0; i < this.app.server.length; i++)
		{
			this.tabs.push(this.app.server[i].config.name);
		}

		this.currentServerIndex = 0;
		console.log('server length:', this.app.server.length);

		this.$nextTick(() => {
			this.updateServerData();
		});


	},

	methods: {
		onClickTab: function(index)
		{
			console.log('click tab', index);
			this.creatingNew = false;
			if (index < this.tabs.length) {				
				this.currentServerIndex = index;
				this.updateServerData();
			}
			else
			{
				this.creatingNew = true;
				this.server = null;
				this.currentServerIndex = -1;
				console.log('create new server');
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

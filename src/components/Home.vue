<template>
	<div class='home' v-if="app != null">
		<tabs :value="tabs" :active="currentServerIndex" @click='onClickTab' />
		<server ref='server' class="servercontainer" :app="app" :server="server" />
	</div>
</template>

<script>

import Tabs from "./Tabs.vue";
import Server from "./Server.vue";

const remote = window.require('electron').remote;

export default {

	data: () => ({
		app:null,
		currentServerIndex:0,
		server:null,
		tabs:[]
	}),
	
	components: {
		Tabs, Server
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
			this.currentServerIndex = index;
			this.updateServerData();
		},

		updateServerData: function()
		{
			this.server = this.app.server[this.currentServerIndex];
			this.$nextTick(() => {

				this.$refs.server.updateAll();
			});
		}
	}

}
</script>

<style lang="scss" scoped>
	.home {

		.servercontainer {
			position:absolute;
			top:32px;
			height:calc(100vh - 32px);
			width:100vw;
			background-color: white;
		}
	}
</style>

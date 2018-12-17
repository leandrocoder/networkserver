<template>
	<div class='page'>
		<!--
		<div class="boxcontainer">
			<div class="left">
				<div class='values'>
					<value-box title="Connections" color="#ffffffDD" width="50%" :value="displayData.connections" message="" />
					<value-box title="Type" color="#ffffffDD" width="50%" :value="displayData.connections" message="" />
				</div>
				<value-box title="Traffic" color="#333333dd" width="calc(100% - 20px)" bg="#ffffff" height="150" :value="displayData.connections" message="">muito bom hahahha</value-box>
			</div>
			<div class="messages">
				<message-log />
			</div>
		</div>
		-->

		<div class="connections">
			<box class="databox"><h1>Total Connections</h1><p>{{displayData.connections}}</p></box>
		</div>

		<!--

		<div style="display:flex">
			<div style="width:180px">
				
				<box class="databox" style="height:260px"><h1>Connection Types</h1>
					<div style="position:relative; display:flex; flex-wrap:wrap; padding-top:10px;">
						<connection-box v-for="(item, index) in displayData.connectionTypes" :type="item.type" :count="item.count"  />
					</div>
				</box>
			</div>
			<div style="width:400px; margin-left:20px;">
				<message-log :messages="displayData.messageLog"/>
			</div>
		</div>
		-->
	</div>
</template>

<script>

import WebSocketClient from 'lcnet/client';
import ValueBox from './ValueBox.vue';
import Box from './Box.vue';
import ConnectionBox from './ConnectionBox.vue';
import MessageLog from './MessageLog.vue';

const remote = window.require('electron').remote;

export default {
  name: 'hello',
  data () {
    return {
		app: null,
		server:null,

		displayData:{
			connections:0,
			connectionTypes: [
				{type:"default", count:100},
				{type:"manager", count:3},
				{type:"ipad", count:26},
			],
			messageLog:[]
		},
      	msg: 'Welcome to Server'
    }
  },


  components: {
	  ValueBox, MessageLog, Box, ConnectionBox
  },

  methods: {

	  setServer: function(index)
	  {
		  console.log("set server:", this.app.server);
		  if (this.app.server.length > index)
		  {
			  this.server = this.app.server[index];
			  console.log("defined!", this.server);
		  }
	  },

	  updateData: function(server)
	  {
		  console.log("server 1", server);
		  console.log("server 2", this.server);
		  if (server.id == this.server.id)
		  {
			this.displayData.connections = this.server.server.clients.length;
		  	this.displayData.messageLog = this.server.messageLog.reverse();
		  	console.log("update data...");
		  }
	  }

  },

  mounted() {

	this.app = remote.getGlobal('app');
	
	this.app.on("message", (server, data, sender) => this.updateData(server) );
	this.app.on("close", (server, client) => this.updateData(server) );
	this.app.on("connect", (server, client) => this.updateData(server) );

	this.setServer(0);
	
	/*
	let client = new WebSocketClient('localhost', 5000, 'serverview');
	client.on("message", function(data) {
		console.log("receive >", data);
	});
	*/
    
  }
}
</script>

<style lang="scss" scoped>
	.page {
		position:absolute;
		width: 800px;
		max-width: 800px;
		height: 500px;
		max-height: 500px;
		margin:0;
		padding: 0;
		top:0px;
		left: 0px;
		background-color: white;

		.databox {
			position:relative;
			width:180px;
		}

		.connections {
			position:absolute;
			left:0px;
			top:0px;
			font-size: 40px;
			padding-bottom: 0px;
			p {
				margin: 0;
			}
		}

		.left {
			width:50%;
		}

	}
</style>

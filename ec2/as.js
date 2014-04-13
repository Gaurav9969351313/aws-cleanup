var clean = function clean(AWS,region){
	var as = new AWS.AutoScaling({region:region});
	var describeAutoScalingGroups = as.describeAutoScalingGroups();

	describeAutoScalingGroups.on('success',function(resp){
		//resp['data']['AutoScalingGroups'][0]['AutoScalingGroupName']
		if (resp.data.AutoScalingGroups.length>0) {
			for(var a in resp.data.AutoScalingGroups){
				var ASGroupName = resp.data.AutoScalingGroups[a].AutoScalingGroupName;
				if(resp.data.AutoScalingGroups[a].DesiredCapacity != 0)
					setCapacity(AWS,region,ASGroupName);
			}
		};
	});

	describeAutoScalingGroups.on('error',function(resp){
		console.log('Error occured while describing AutoScaling Groups: ');
		console.log(resp);
	});

	describeAutoScalingGroups.send();
};
module.exports.clean = clean;

var setCapacity = function(AWS,region,ASGroupName){
	var params = {
	  AutoScalingGroupName: ASGroupName, // required
	  DesiredCapacity: 0, // required
	  // HonorCooldown: true || false,
	};

	var as = new AWS.AutoScaling({region:region});
	var setDesiredCapacity = as.setDesiredCapacity(params);

	setDesiredCapacity.on('error',function(resp){
		console.log('Error occured while setting capacity of AutoScaling Group');
		console.log(resp);
	});
	setDesiredCapacity.on('success',function(resp){
		console.log('Successfully reset ASG', ASGroupName,'capacity in region',region);
		// console.log(resp);
	});
	setDesiredCapacity.send();
}

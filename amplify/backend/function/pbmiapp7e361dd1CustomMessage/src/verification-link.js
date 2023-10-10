/**
 * @type {import('@types/aws-lambda').CustomMessageTriggerHandler}
 */
exports.handler = async (event) => {
  // Define the URL that you want the user to be directed to after verification is complete
  if (event.triggerSource === 'CustomMessage_SignUp') {
    const { codeParameter } = event.request;
    const { region, userName } = event;
    const { clientId } = event.callerContext;
    const redirectUrl = `${process.env.REDIRECTURL}/?username=${userName}`;
    // const resourcePrefix = process.env.RESOURCENAME.split('CustomMessage')[0];

    // const hyphenRegions = [
    //   'us-east-1',
    //   'us-west-1',
    //   'us-west-2',
    //   'ap-southeast-1',
    //   'ap-southeast-2',
    //   'ap-northeast-1',
    //   'eu-west-1',
    //   'sa-east-1',
    // ];

    // const separator = hyphenRegions.includes(region) ? '-' : '.';

    const payload = Buffer.from(
      JSON.stringify({
        userName,
        redirectUrl,
        region,
        clientId,
      }),
    ).toString('base64');
    // eslint-disable-next-line spellcheck/spell-checker
    // const bucketUrl = `http://${resourcePrefix}verificationbucket-${process.env.ENV}.s3-website${separator}${region}.amazonaws.com`;
	//Need to add the actual url here once it is determined
	const urlBase = (process.env.CURRENT_ENVIRONMENT === 'PROD') ? '' : 'http://localhost:19006/VerifyEmail';
    const url = `${urlBase}/?data=${payload}&code=${codeParameter}`;
    const message = `${process.env.EMAILMESSAGE}. \n ${url}`;
    event.response.smsMessage = message;
    event.response.emailSubject = process.env.EMAILSUBJECT;
    event.response.emailMessage = message;
    console.log('event.response', event.response);
  }

  return event;
};

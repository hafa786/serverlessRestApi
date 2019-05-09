export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
      REGION: "us-east-2",
      BUCKET: "hafiz-priceff-app"
    },
    apiGateway: {
      REGION: "us-east-2",
      URL: "https://r6futzzpr0.execute-api.us-east-2.amazonaws.com/prod"
    },
    cognito: {
      REGION: "us-east-2",
      USER_POOL_ID: "us-east-2_T7988SLN1",
      APP_CLIENT_ID: "4frhgtpdinv5uk5f9jl7c0lcei",
      IDENTITY_POOL_ID: "us-east-2:43c9588e-c115-4ffb-a36a-7dae9a44f372"
    }
  };
  
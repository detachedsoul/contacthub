import Parse from "parse";

const PARSE_APPLICATION_ID = "plbXUCZ8nfi2lwLxmNXKXNZSYRvWAAXWt0bs39Vz";
const PARSE_JAVASCRIPT_KEY = "0Opk9h1lniKb4NUrp9j4nbQDHbVO6mPkbPSD0kKt";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export default Parse;

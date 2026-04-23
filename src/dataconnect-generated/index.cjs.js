const {
	queryRef,
	executeQuery,
	validateArgs,
	validateArgsWithOptions,
} = require("firebase/data-connect");

const connectorConfig = {
	connector: "example",
	service: "skild-dfeab-service",
	location: "me-west1",
};
exports.connectorConfig = connectorConfig;
const dataConnectSettings = {};
exports.dataConnectSettings = dataConnectSettings;

const getSkillsRef = (dcOrVars, vars) => {
	const { dc: dcInstance, vars: inputVars } = validateArgs(
		connectorConfig,
		dcOrVars,
		vars,
	);
	dcInstance._useGeneratedSdk();
	return queryRef(dcInstance, "GetSkills", inputVars);
};
getSkillsRef.operationName = "GetSkills";
exports.getSkillsRef = getSkillsRef;

exports.getSkills = function getSkills(dcOrVars, varsOrOptions, options) {
	const {
		dc: dcInstance,
		vars: inputVars,
		options: inputOpts,
	} = validateArgsWithOptions(
		connectorConfig,
		dcOrVars,
		varsOrOptions,
		options,
		true,
		false,
	);
	return executeQuery(
		getSkillsRef(dcInstance, inputVars),
		inputOpts?.fetchPolicy,
	);
};

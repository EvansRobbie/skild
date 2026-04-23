import { executeQuery, queryRef, validateArgs } from "firebase/data-connect";

export const connectorConfig = {
	connector: "example",
	service: "skild-dfeab-service",
	location: "me-west1",
};
export const dataConnectSettings = {};

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
export { getSkillsRef };

export function getSkills(dcOrVars, varsOrOptions, options) {
	const { dc: dcInstance, vars: inputVars } = validateArgs(
		connectorConfig,
		dcOrVars,
		varsOrOptions,
	);
	const fetchPolicy = options?.fetchPolicy;
	return executeQuery(getSkillsRef(dcInstance, inputVars), fetchPolicy);
}

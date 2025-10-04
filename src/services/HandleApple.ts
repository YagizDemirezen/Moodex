import appleAuth from "@invertase/react-native-apple-authentication";

const handleApple = async () => {
    try{
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });
        console.log("🍏 Apple User:", appleAuthRequestResponse);
    } catch (error) {
        console.error("❌ Apple Login Error:", error);
    }
};

export default handleApple;
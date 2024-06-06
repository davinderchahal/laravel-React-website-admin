export const showSessionMsg = () => {
    fetch(route('getSession'))
        .then(response => response.json())
        .then(json => {
            var sessionSuccessMsg = json.data.success
            var sessionFailMsg = json.data.fail;
            (sessionSuccessMsg) ? demo.showNotification(sessionSuccessMsg) : '';
            (sessionFailMsg) ? demo.showNotification(sessionFailMsg, 4) : '';
        })
        .catch(error => console.error(error));
};

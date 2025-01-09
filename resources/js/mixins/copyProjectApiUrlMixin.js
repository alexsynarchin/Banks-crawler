export const copyProjectApiUrlMixin = {
    methods : {
        copyTaskUrl(item) {
            const url = window.location.protocol + '//' + window.location.host + '/api/gettask/' + item.api_key + '?';
            let taskUrlInput = document.querySelector('#task_url');
            taskUrlInput.setAttribute('type', 'text');
            taskUrlInput.setAttribute('value', url);
            taskUrlInput.select()

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                this.$message({
                    type: 'success',
                    message: 'Ссылка для выдачи задания скопирована'
                });
            } catch (err) {

            }

            /* unselect the range */
            taskUrlInput.setAttribute('type', 'hidden')
            window.getSelection().removeAllRanges()
        }
    }
}

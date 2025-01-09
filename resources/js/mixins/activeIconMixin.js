export const activeIconMixin = {
    methods: {
        stopOrPauseIcon(state) {
            return state ? 'VideoPause' : 'VideoPlay';
        }
    }
}

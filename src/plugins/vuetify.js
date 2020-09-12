import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { colors } from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.lightGreen.darken1,
                secondary: colors.lightGreen.darken2,
                accent: colors.shades.black,
                error: colors.red.accent3,
                bodyBgColor: colors.grey.lighten4,
                cardsBG: colors.lightGreen.lighten1,
                cardsSelectedBG: colors.lightGreen
            },
            dark: {
                primary: colors.blue.lighten3,
            },
        },
    },
});

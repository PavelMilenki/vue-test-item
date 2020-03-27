<template>
    <div class="main">
        <Loader v-if="loading"/>
        <form v-else class="formData" @submit.prevent="submitHandler">
            <div class="input-field">
                <select ref="select" v-model="currentId">
                    <option value="" selected disabled>Выберите валюту</option>
                    <option v-for="c of currency" :key="c.id" :value="c.id">
                        {{c.abbreviation}}
                    </option>
                </select>
                <label>Валюта</label>
                <span class="helper-text invalid"
                      v-if="$v.currentId.$dirty && !$v.currentId.required">
                    Выберите валюту
                </span>
            </div>
            <div class="input-field">
                <input id="date"
                       type="date"
                       v-model="currentDate">
                <label for="date">Дата</label>
                <span class="helper-text invalid"
                      v-if="$v.currentDate.$dirty && !$v.currentDate.required">
                    Введите дату
                </span>
            </div>
            <div>
                <button class="btn waves-effect waves-light" type="submit" :disabled="buttonDisabled">
                    Отправить
                    <i class="material-icons right">send</i>
                </button>
            </div>
        </form>
        <TextOutput :currentCurrency="currentCurrency"
                    :key="currentCurrency.Cur_ID"
                    v-if="currentCurrency"/>
        <div v-show="error.status" class="error">{{error.message}}</div>
    </div>
</template>

<script>

    import TextOutput from "../components/TextOutput";
    import {required} from 'vuelidate/lib/validators'

    export default {
        name: 'Home',
        components: {
            TextOutput,
        },
        data: () => ({
            loading: true,
            select: null,
            currency: null,
            currentId: null,
            currentDate: null,
            currentCurrency: null,
            buttonDisabled: false,
            error: {
                status: false,
                message: ''
            },

        }),
        validations: {
            currentId: {required},
            currentDate: {required}
        },
        watch: {
            currentId(value) {
                this.currentId = value
            },
            currentDate(date) {
                this.currentDate = date
            }
        },
        methods: {
            errorMessage(status, message, e) {
                this.error.message = message;
                this.error.status = status;
                this.currentCurrency = null;
                console.log('ERROR', e.message)
            },
            async submitHandler() {
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return
                }
                try {
                    const currencyData = {
                        id: this.currentId,
                        date: this.currentDate
                    };
                    this.currentCurrency = await this.$store.dispatch('updateCurrency', currencyData);
                    this.error.status = false
                } catch (e) {
                    this.errorMessage(true, 'Ошибка запроса', e)
                }
                this.buttonDisabled = true;
                setTimeout(() => {
                    this.buttonDisabled = false
                }, 500)
            }
        },
        async mounted() {
            try {
                this.currency = await this.$store.dispatch('fetchCurrency');
                this.currency = this.currency.map(m => ({
                    id: m.Cur_ID,
                    abbreviation: m.Cur_Abbreviation
                }));
                this.error.status = false;
            } catch (e) {
                this.errorMessage(true, 'Ошибка запроса', e)
            }
            setTimeout(() => {
                this.select = M.FormSelect.init(this.$refs.select);
                M.updateTextFields()
            });
            this.loading = false
        },
        destroyed() {
            if (this.select && this.select.destroy) {
                this.select.destroy()
            }
        }
    }
</script>

<script>
import AddressInfoForm from './components/AddressInfoForm.vue'
import DocumentInfoForm from './components/DocumentInfoForm.vue'
import PersonalInfoForm from './components/PersonalInfoForm.vue'

export default {
    name: 'App',
    components: {
        AddressInfoForm,
        DocumentInfoForm,
        PersonalInfoForm
    },
    data() {
        return {
            count: 0,
            formData: {
                personalForm: {},
                addressForm: {},
                documentsForm: {}
            },
            isFormCorrect: false,
        }
    },
    methods: {
        submitForm() {
            this.$refs.personalInfoForm.$v.$touch();
            this.$refs.addressInfoForm.$v.$touch();
            this.$refs.documentInfoForm.$v.$touch();
            
            if (!this.$refs.personalInfoForm.$v.$invalid && !this.$refs.addressInfoForm.$v.$invalid && !this.$refs.documentInfoForm.$v.$invalid) {
                this.formData.personalForm = this.$refs.personalInfoForm.getFormData();
                this.formData.addressForm = this.$refs.addressInfoForm.getFormData();
                this.formData.documentsForm = this.$refs.documentInfoForm.getFormData();
                this.isFormCorrect = true;
                console.log(this.$refs.personalInfoForm.getFormData(), this.$refs.addressInfoForm.getFormData(), this.$refs.documentInfoForm.getFormData());
            }
        },
        incrementCount() {
            if (this.count < 2) {
                this.count++;
            }
        },
        decrementCount() {
            if (this.count > 0) {
                this.count--;
            }
        },
    },
}
</script>

<template>
    <div id="app" class="wrapper">
        <form class="wrapper__form" @submit.prevent="submitForm">
            <PersonalInfoForm v-show="count === 0" ref="personalInfoForm" />
            <AddressInfoForm v-show="count === 1" ref="addressInfoForm" />
            <DocumentInfoForm v-show="count === 2" ref="documentInfoForm" />
            <div class="wrapper__group-buttons">
                <button type="button" @click="decrementCount" :disabled="count === 0">Назад</button>
                <button type="button" @click="incrementCount" :disabled="count === 2">Дальше</button>
            </div>
            <button class="wrapper__send" v-if="count === 2" type="submit">Отправить</button>
        </form>
        <div class="wrapper__success" v-if="isFormCorrect">
            <h2 class="success__title">Форма успешно создана!</h2>
            <div class="success__buttons">
                <button  @click="isFormCorrect = false">Отлично!</button>
            </div>
        </div>
    </div>
</template>

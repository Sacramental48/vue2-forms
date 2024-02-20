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
        }
    },
    methods: {
        submit() {
            const PersonFormData = this.$refs.personalInfoForm.getFormData();
            const AddressFormData = this.$refs.addressInfoForm.getFormData();
            const DocumentsormData = this.$refs.documentsInfoForm.getFormData();
            console.log({...PersonFormData, ...AddressFormData, ...DocumentsormData});
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
        }
    },
}
</script>

<template>
    <div id="app" class="wrapper">
        <form class="wrapper__form" @submit.prevent="submit">
            <PersonalInfoForm v-show="count === 0" ref="personalInfoForm" />
            <AddressInfoForm v-show="count === 1" ref="addressInfoForm" />
            <DocumentInfoForm v-show="count === 2" ref="documentsInfoForm" />
            <div class="wrapper__group-buttons">
                <button type="button" @click="decrementCount" :disabled="count === 0">Назад</button>
                <button type="button" @click="incrementCount" :disabled="count === 2">Дальше</button>
            </div>
            <button class="wrapper__button" v-if="count === 2" type="submit">Отправить</button>
        </form>
    </div>
</template>

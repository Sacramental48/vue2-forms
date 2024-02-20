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
            console.log('submit');
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
        <form class="wrapper__form" @submit.prevent="submit">
            <PersonalInfoForm v-show="count === 0" />
            <AddressInfoForm v-show="count === 1" />
            <DocumentInfoForm v-show="count === 2" />
            <div class="wrapper__group-buttons">
                <button type="button" @click="decrementCount" :disabled="count === 0">Назад</button>
                <button type="button" @click="incrementCount" :disabled="count === 2">Дальше</button>
            </div>
            <button class="wrapper__button" v-if="count === 2" type="submit">Отправить</button>
        </form>
    </div>
</template>
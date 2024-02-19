new Vue({
    el: '#app',
    data: {
        name: 'asd',
        age: '',
        message: 'asdasd'
    },

    methods: {
        submit() {
            console.log(this.name);
        }
    },

    validations: {
        name: {
            required,
            minLength: minLength(4)
        },
        age: {
            between: between(20, 30)
        }
    },
})
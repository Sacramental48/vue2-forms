<script>
import { required, minLength, maxLength, numeric } from 'vuelidate/lib/validators'
    export default {
        name: 'PersonalInfoForm',
        data() {
            return {
                name: '',
                surname: '',
                patronymic: '',
                birthdate: '',
                phone: '',
                gender: '',
                clientGroup: [],
                doctor: '',
                checkbox: false
            }
        },
        methods: {
            validPersonName(value) {
                if(value === '') {
                    return true
                } else {
                    const startsWithUppercase = /^[A-ZА-ЯЁ]/.test(value);
                    const withoutDigits = !/\d/.test(value);
                    return startsWithUppercase && withoutDigits;
                }
            },
            getFormData() {
                return {
                    name: this.name,
                    surname: this.surname,
                    patronymic: this.patronymic,
                    birthdate: this.birthdate,
                    phone: this.phone,
                    gender: this.gender,
                    clientGroup: this.clientGroup,
                    doctor: this.doctor,
                    checkbox: this.checkbox
                };
            },
        },
        validations: {
            name: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(50),
                validPersonName(value) {
                    return this.validPersonName(value);
                }
            },

            surname: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(50),
                validPersonName(value) {
                    return this.validPersonName(value);
                }
            },

            patronymic: {
                minLength: minLength(2),
                maxLength: maxLength(50),
                validPersonName(value) {
                    return this.validPersonName(value);
                }
            },

            birthdate: {
                required,
                maxDate(value) {
                    return new Date(value) <= new Date();
                }
            },

            phone: {
                required,
                maxLength: maxLength(11),
                numeric,
            },

            gender: {

            },

            clientGroup: {
                required,

            },

            doctor: {

            }

        },
    }
</script>

<template>
    <article class="form__section">
        <section class="form__group">
            <label class="form__label" for="name">Имя:</label>
            <input 
                class="form__input" 
                :class="{'input-error': !$v.name.minLength || !$v.name.maxLength || !$v.name.validPersonName }" 
                type="text" 
                id="name" 
                name="name" 
                v-model.trim="name" 
            />
            <div class="form__error" v-if="$v.name.$dirty && !$v.name.required">Это поле должно быть заполнено.</div>
            <div class="form__error" v-if="!$v.name.minLength">В имени должно быть не менее {{$v.name.$params.minLength.min}} букв.</div>
            <div class="form__error" v-if="!$v.name.maxLength">В имени должно быть не более {{$v.name.$params.maxLength.max}} букв.</div>
            <div class="form__error" v-if="$v.name.$dirty && !$v.name.validPersonName && $v.name.$model">Имя должно начинаться с заглавной буквы и не содержать цифры.</div>
        </section>

        <section class="form__group">
            <label class="form__label" for="surname">Фамилия:</label>
            <input 
                class="form__input" 
                :class="{'input-error': !$v.surname.minLength || !$v.surname.maxLength || !$v.surname.validPersonName }" 
                type="text" 
                id="surname" 
                name="surname" 
                v-model.trim="$v.surname.$model" 
            />
            <div class="form__error" v-if="$v.surname.$dirty && !$v.surname.required">Это поле должно быть заполнено.</div>
            <div class="form__error" v-if="!$v.surname.minLength">В Фамилии должно быть не менее {{$v.surname.$params.minLength.min}} букв.</div>
            <div class="form__error" v-if="!$v.surname.maxLength">В Фамилии должно быть не более {{$v.surname.$params.maxLength.max}} букв.</div>
            <div class="form__error" v-if="$v.surname.$dirty && !$v.surname.validPersonName && $v.surname.$model">Фамилия должно начинаться с заглавной буквы и не содержать цифры.</div>

        </section>
        
        <section class="form__group">
            <label class="form__label" for="patronymic">Отчество:</label>
            <input 
                class="form__input" 
                :class="{'input-error': !$v.patronymic.minLength || !$v.patronymic.maxLength || !$v.patronymic.validPersonName }" 
                type="text" 
                id="patronymic"
                name="patronymic" 
                v-model.trim="$v.patronymic.$model" 
            />

            <div class="form__error" v-if="!$v.patronymic.minLength">В Отчестве должно быть не менее {{$v.patronymic.$params.minLength.min}} букв.</div>
            <div class="form__error" v-if="!$v.patronymic.maxLength">В Отчестве должно быть не более {{$v.patronymic.$params.maxLength.max}} букв.</div>
            <div class="form__error" v-if="$v.patronymic.$dirty && !$v.patronymic.validPersonName && $v.patronymic.$model">Отчество должно начинаться с заглавной буквы и не содержать цифры.</div>
        </section>

        <section class="form__group">
            <label class="form__label" for="birthdate">Дата рождения:</label>
            <input 
                class="form__input" 
                type="date" 
                id="birthdate" 
                name="birthdate" 
                v-model="$v.birthdate.$model" 
            />
            <div class="form__error" v-if="$v.birthdate.$dirty && !$v.birthdate.required">Пожалуйста, введите дату рождения.</div>
            <div class="form__error" v-if="$v.birthdate.$dirty && !$v.birthdate.maxDate">День рождения не может быть выше текущей даты.</div>
        </section>

        <section class="form__group">
            <label class="form__label" for="phone">Номер телефона:</label>
            <input 
                class="form__input" 
                :class="{'input-error': !$v.phone.numeric && $v.phone.$dirty }" 
                type="tel" 
                id="phone" 
                name="phone" 
                v-model.trim="$v.phone.$model" 
            />
            <div class="form__error" v-if="$v.phone.$dirty && !$v.phone.required">Это поле должно быть заполнено.</div>
            <div class="form__error" v-if="!$v.phone.numeric">Введен некорректный номер.</div>
            <div class="form__error" v-if="!$v.phone.maxLength">Введен вами номер превышает {{ $v.phone.$params.maxLength.max }} символов.</div>
        </section>

        <section class="form__group">
            <label class="form__label" for="gender">Пол:</label>
            <select id="gender" name="gender" v-model="$v.gender.$model">
                <option value="" disabled selected>Выберите пол</option>
                <option value="male">Мужчина</option>
                <option value="female">Женщина</option>
            </select>
        </section>

        <section class="form__group">
            <label class="form__label" for="clientGroup">Группа клиентов:</label>
            <select name="clientGroup" id="clientGroup" multiple v-model="$v.clientGroup.$model">
                <option value="VIP">VIP</option>
                <option value="problem">Проблемные</option>
                <option value="OMS">ОМС</option>
            </select>
            <div class="form__error" v-if="$v.clientGroup.$dirty && !$v.clientGroup.required">Значение должно быть выбрано.</div>
        </section>
        
        <section class="form__group">
            <label class="form__label" for="doctor">Лечащий врач:</label>
            <select  name="doctor" id="doctor" v-model="$v.doctor.$model">
                <option value="" disabled checked>Выберите врача</option>
                <option value="Иванов">Иванов</option>
                <option value="Захаров">Захаров</option>
                <option value="Чернышева">Чернышева</option>
            </select>
        </section>

        <label class="form__label">
            <input class="form__input-checkbox" type="checkbox" name="noSMS" v-model="checkbox"> Не отправлять СМС
        </label>
    </article>
</template>
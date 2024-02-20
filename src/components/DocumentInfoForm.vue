<script>
import { required, numeric, maxLength, minLength  } from 'vuelidate/lib/validators'

export default {
    name: 'DocumentInfoForm',
    data() {
        return {
            documentType: '',
            series: '',
            number: '',
            issuedBy: '',
            issueDate: '',
        }
    },
    methods: {
        getFormData() {
            return {
                documentType: this.documentType,
                series: this.series,
                number: this.number,
                issuedBy: this.issuedBy,
                issueDate: this.issueDate,
            };
        },
        withoutDigits(value) {
            if(value === '') {
                return true;
            } else {
                return !/\d/.test(value);
            }
        },
    },
    validations: {
        documentType: {
            required
        },

        series: {
            numeric,
            minLength: minLength(4),
            maxLength: maxLength(4),
        },
        
        number: {
            numeric,
            minLength: minLength(6),
            maxLength: maxLength(6),
        },
        
        issuedBy: {
            withoutDigits(value) {
                return this.withoutDigits(value);
            }
        },
        
        issueDate: {
            required,
            maxDate(value) {
                if(value === '') {
                    return true;
                }
                return new Date(value) <= new Date();
            }
        },
        
    }
}
</script>

<template>
    <article class="form__section">
        <section class="form__group">
            <label class="form__label" for="documentType">Тип документа</label>
            <select id="documentType" name="documentType" v-model="$v.documentType.$model">
                <option value="" disabled checked>Выберите тип документа.</option>
                <option value="passport">Паспорт</option>
                <option value="birthCertificate">Свидетельство о рождении</option>
                <option value="driverLicense">Вод. удостоверение</option>
            </select>
            <div class="form__error" v-if="$v.documentType.$dirty && !$v.documentType.required">Значение должно быть выбрано.</div>
        </section>

        <section class="form__group">
            <label class="form__label" for="series">Серия</label>
            <input 
                class="form__input" 
                :class="{'input-error': !$v.series.minLength || !$v.series.maxLength || !$v.series.numeric}"
                type="text" 
                id="series" 
                name="series" 
                placeholder="XXXX"
                v-model.trim="$v.series.$model"
            />
            <div class="form__error" v-if="!$v.series.minLength || !$v.series.maxLength || !$v.series.numeric">Серия должна состоять из {{$v.series.$params.maxLength.max}} цифр.</div>
        </section>

        <section class="form__group">
            <label class="form__label" for="number">Номер</label>
            <input 
                class="form__input" 
                :class="{'input-error': !$v.number.minLength || !$v.number.maxLength || !$v.number.numeric}"
                type="text" 
                id="number" 
                name="number" 
                placeholder="XXXXXX" 
                v-model.trim="$v.number.$model"
            />
            <div class="form__error" v-if="!$v.number.minLength || !$v.number.maxLength || !$v.number.numeric">Номер должен состоять из {{$v.number.$params.maxLength.max}} цифр.</div>
        </section>

        <section class="form__group">
            <label class="form__label" for="issuedBy">Кем выдан</label>
            <input 
                class="form__input" 
                :class="{'input-error': !$v.issuedBy.withoutDigits}"
                type="text" 
                id="issuedBy" 
                name="issuedBy"
                v-model="$v.issuedBy.$model"
            />
            <div class="form__error" v-if="!$v.issuedBy.withoutDigits">Введенны некорректные данные.</div>
        </section>

        <section class="form__group">
            <label class="form__label" for="issueDate">Дата выдачи</label>
            <input 
                class="form__input" 
                type="date" 
                id="issueDate" 
                name="issueDate" 
                v-model="$v.issueDate.$model"
            />
            <div class="form__error" v-if="$v.issueDate.$dirty && !$v.issueDate.required">Это поле должно быть заполнено.</div>
            <div class="form__error" v-if="!$v.issueDate.maxDate">Введите корректную дату выдачи.</div>
        </section>
    </article>
</template>
<script>
import { required, numeric, maxLength, alpha } from 'vuelidate/lib/validators'
export default {
    data() {
        return {
            documentType: '',
            series: '',
            number: '',
            issuedBy: '',
            issueDate: '',
        }
    },
    validations: {
        documentType: {
            required,

        },

        series: {
            numeric,
            maxLength: maxLength(4),
        },
        
        number: {
            numeric,
            maxLength: maxLength(6),
        },
        
        issuedBy: {
            alpha
        },
        
        issueDate: {
            required,
            numeric,
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
        </section>

        <section class="form__group">
            <label class="form__label" for="series">Серия</label>
            <input 
                class="form__input" 
                :class="{'input-error': !$v.series.maxLength || !$v.series.numeric}"
                type="text" 
                id="series" 
                name="series" 
                placeholder="XXXX"
                v-model.trim="$v.series.$model"
            />
            <div class="form__error" v-if="!$v.series.maxLength || !$v.series.numeric">Серия должна состоять из четырех цифр.</div>
        </section>

        <section class="form__group">
            <label class="form__label" for="number">Номер</label>
            <input 
                class="form__input" 
                :class="{'input-error': !$v.number.maxLength || !$v.number.numeric}"
                type="text" 
                id="number" 
                name="number" 
                placeholder="XXXXXX" 
                v-model.trim="$v.number.$model"
            />
            <div class="form__error" v-if="!$v.number.maxLength || !$v.number.numeric">Номер должен состоять из шести цифр.</div>
        </section>

        <section class="form__group">
            <label class="form__label" for="issuedBy">Кем выдан</label>
            <input 
                class="form__input" 
                type="text" 
                id="issuedBy" 
                name="issuedBy"
                v-model="$v.issuedBy.$model"
            />
            <div class="form__error" v-if="!$v.issuedBy.alpha">adassdadasdasdas</div>
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
            <div class="form__error" v-if="!$v.issueDate.maxDate">Введите корректную дату выдачи.</div>
        </section>
    </article>
</template>
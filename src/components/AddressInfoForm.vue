<script>
import { maxLength, minLength, required, numeric } from 'vuelidate/lib/validators'

export default {
    name: 'AddressInfoForm',
    data() {
        return {
            index: '',
            country: '',
            region: '', 
            city: '',
            street: '',
            house: '',
        }
    },
    methods: {
        withoutDigits(value) {
            if(value === '') {
                return true;
            } else {
                return !/\d/.test(value);
            }
        },
        getFormData() {
            return {
                index: this.index,
                country: this.country,
                city: this.city,
                street: this.street,
                house: this.house,
            };
        },
    },
    validations: {
        index: {
            minLength: minLength(6),
            maxLength: maxLength(6),
            numeric
        },

        country: {
            withoutDigits(value) {
                return this.withoutDigits(value);
            }
        },

        region: {
            withoutDigits(value) {
                return this.withoutDigits(value);
            }
        },

        city: {
            required,
            withoutDigits(value) {
                return this.withoutDigits(value);
            }
        },

        street: {
            withoutDigits(value) {
                return this.withoutDigits(value);
            }
        },

        house: {
            numeric,
            withoutDigits(value) {
                return this.withoutDigits(value);
            },
        }
    }

}
</script>

<template>
    <article class="form__section">
        <section class="form__group">
            <label class="form__label" for="index">Индекс</label>
            <input 
                class="form__input" 
                :class="{'input-error': !$v.index.minLength || !$v.index.maxLength || !$v.index.numeric}"
                type="text" id="index" 
                name="index" 
                v-model.trim="$v.index.$model" 
            />
            <div class="form__error" v-if="!$v.index.minLength || !$v.index.maxLength">Индекс должен состоять из шести цифр.</div>
            <div class="form__error" v-if="!$v.index.numeric">Индекс должен состоять из цифр.</div>
        </section>

        <section class="form__group">
            <label class="form__label" for="country">Страна</label>
            <input 
                class="form__input" 
                :class="{'input-error': !$v.country.withoutDigits}"
                type="text" 
                id="country" 
                name="country" 
                v-model.trim="$v.country.$model" 
            />
            <div class="form__error" v-if="!$v.country.withoutDigits">Некорректное название страны.</div>

        </section>

        <section class="form__group">
            <label class="form__label" for="region">Область</label>
            <input 
                class="form__input" 
                :class="{'input-error': !$v.region.withoutDigits}"
                type="text" 
                id="region" 
                name="region" 
                v-model.trim="$v.region.$model" 
            />
            <div class="form__error" v-if="!$v.region.withoutDigits">Некорректное название области.</div>
        </section>

        <section class="form__group">
            <label class="form__label" for="city">Город</label>
            <input 
                class="form__input" 
                :class="{'input-error': !$v.city.withoutDigits}"
                type="text" 
                id="city" 
                name="city" 
                v-model.trim="$v.city.$model" 
            />
            <div class="form__error" v-if="!$v.city.withoutDigits">Некорректное название города.</div>
        </section>

        <section class="form__group">
            <label class="form__label" for="street">Улица</label>
            <input 
                class="form__input" 
                :class="{'input-error': !$v.street.withoutDigits}"
                type="text" 
                id="street" 
                name="street" 
                v-model.trim="$v.street.$model" 
            />
            <div class="form__error" v-if="!$v.street.withoutDigits">Некорректное название улицы.</div>
        </section>

        <section class="form__group">
            <label class="form__label" for="house">Дом</label>
            <input 
                class="form__input" 
                :class="{'input-error': !$v.house.numeric}"
                type="text" 
                id="house" 
                name="house" 
                v-model.trim="$v.house.$model" 
            />
            <div class="form__error" v-if="!$v.house.numeric">Некорректный номер дома.</div>
        </section>
    </article>
</template>
<script>
// import { required } from 'vuelidate/lib/validators'

</script>

<template>
    <article class="form__section">
        <section class="form__group">
            <label class="form__label" for="documentType">Тип документа</label>
            <select id="documentType" name="documentType">
                <option value="passport">Паспорт</option>
                <option value="birthCertificate">Свидетельство о рождении</option>
                <option value="driverLicense">Вод. удостоверение</option>
            </select>
        </section>

        <section class="form__group">
            <label class="form__label" for="series">Серия</label>
            <input class="form__input" type="text" id="series" name="series" />
        </section>

        <section class="form__group">
            <label class="form__label" for="number">Номер</label>
            <input class="form__input" type="text" id="number" name="number" />
        </section>

        <section class="form__group">
            <label class="form__label" for="issuedBy">Кем выдан</label>
            <input class="form__input" type="text" id="issuedBy" name="issuedBy" />
        </section>

        <section class="form__group">
            <label class="form__label" for="issueDate">Дата выдачи</label>
            <input class="form__input" type="date" id="issueDate" name="issueDate" />
        </section>
    </article>
</template>
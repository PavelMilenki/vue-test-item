<template>
    <div class="textOut">
        Официальный курс {{currentCurrency.Cur_Scale}} {{currentCurrency.Cur_Name}}
       ({{currentCurrency.Cur_Abbreviation}}) на {{currentCurrency.Date | date('date')}}
        равен {{currentCurrency.Cur_OfficialRate}} бел. руб.
    </div>
</template>

<script>
    export default {
        name: "TextOutput",
        props: {
            currentCurrency: {
                type: Object,
                required: true
            }
        }
    }
</script>



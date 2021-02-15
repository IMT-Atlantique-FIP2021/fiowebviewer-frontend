<template>
    <div class="bg-gray-300 rounded-full flex-none py-1 px-2 my-1 font-bold text-black text-xs">
        {{ text }}
    </div>
</template>

<script>
export default {
    props: [ 'text' ]
}
</script>
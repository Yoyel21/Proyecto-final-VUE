<template>
    <div class="flex items-center justify-center h-screen bg-gray-400">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 class="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
            <form @submit.prevent="login">
                <input v-model="username" type="text" placeholder="Usuario" class="w-full p-2 border rounded mb-3" />
                <input v-model="password" type="password" placeholder="Contraseña"
                    class="w-full p-2 border rounded mb-3" />
                <button class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-800">Entrar</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');

const login = () => {
    if (username.value && password.value) {
        localStorage.setItem("username", username.value);
        router.push('/home'); // Simulación de login exitoso
    }
};
</script>
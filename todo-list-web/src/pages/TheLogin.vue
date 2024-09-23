<template>
  <div class="grid grid-cols-12">
    <div v-if="$q.screen.gt.xs" class="col-span-6 md:col-span-8">
      <video class="background-video" autoplay loop muted>
        <source type="video/webm" src="/videos/Task_Video.mp4" />
      </video>
      <!-- Vídeo de
      <a
        href="https://pixabay.com/pt/users/andywolares-35304861/?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=166808"
        >Andi Wolares</a
      >
      no
      <a
        href="https://pixabay.com/pt//?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=166808"
        >Pixabay</a
      > -->
    </div>

    <div class="min-h-screen col-span-12 sm:col-span-6 md:col-span-4">
      <q-card class="min-h-screen h-full flex flex-col overflow-y-clip">
        <q-card-section
          class="flex-auto flex flex-col flex-nowrap justify-center p-0"
        >
          <div
            class="flex-auto place-content-center flex flex-col flex-nowrap gap-4 px-8 items-center lg:px-16"
          >
            <q-img
              src="/imgs/logos/logo_full.png"
              alt="Logomarca da instituição"
              fit="contain"
              class="w-11/12"
            />
            <q-form
              class="flex flex-col flex-nowrap mt-8 gap-4 w-full"
              @submit="handleLogin"
            >
              <q-input
                dense
                filled
                square
                label="Username"
                data-cy="main-login-login"
                v-model="usuarioLogin.username"
                type="text"
                placeholder="Insira seu username"
                lazy-rules
                :rules="[(val) => !!val || 'Insira um login']"
              >
              </q-input>
              <q-input
                dense
                filled
                square
                label="Senha"
                data-cy="main-login-senha"
                v-model="usuarioLogin.password"
                :type="hidePassword ? 'password' : 'text'"
                placeholder="Insira sua senha"
                lazy-rules
                :rules="[(val) => !!val || 'Insira uma senha']"
              >
                <template v-slot:append>
                  <q-icon
                    :name="hidePassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="() => (hidePassword = !hidePassword)"
                  />
                </template>
              </q-input>

              <ButtonPrimary
                label="Entrar"
                type="submit"
                aria-label="Botão de Entrar"
                class="w-full mt-4"
              />
            </q-form>
          </div>

          <div class="border-t border-gray-300">
            <h1 class="flex justify-center p-4 text-lg font-black">Salve!</h1>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { Login } from '@/types/interfaces/Login'
import { clearAuthenticationData, signIn } from '@/services/AuthService'
import { setLightMode } from '@/helpers/ThemeHelper'
import ButtonPrimary from '@/components/Global/ButtonPrimary.vue'

defineOptions({ name: 'TheLogin' })

const $q = useQuasar()
const $router = useRouter()

const usuarioLogin = reactive({
  username: '',
  password: '',
})

const hidePassword = ref(true)

const handleRedirect = () => {
  $router.push('/main')
}

const handleLogin = async () => {
  $q.loading.show({
    delay: 400,
  })

  const loginData: Login = {
    username: usuarioLogin.username,
    password: usuarioLogin.password,
  }

  const isSuccess = await signIn(loginData)

  $q.loading.hide()

  if (!isSuccess) {
    $q.notify({
      message: 'Usuário e/ou senha incorretos',
      color: 'negative',
    })

    return
  }

  handleRedirect()
}

onMounted(() => {
  clearAuthenticationData()
  setLightMode()

  let scriptTag = document.createElement('script')
  scriptTag.setAttribute('src', 'https://accounts.google.com/gsi/client')
  scriptTag.setAttribute('async', '')
  document.head.appendChild(scriptTag)
})
</script>

<style scoped lang="scss">
.background-video {
  @apply w-full h-screen object-cover bg-white;
  filter: opacity(50%) grayscale(1);
}
</style>

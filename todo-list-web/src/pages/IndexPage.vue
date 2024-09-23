<template>
  <q-page
    class="main-container min-h-screen py-8 px-4 sm:px-8 md:py-12 lg:px-16"
  >
    <section class="text-center">
      <h1 v-if="user" class="text-2xl sm:text-3xl font-bold">
        Tarefas de {{ user.nome }}
      </h1>
      <!-- <h1 class="text-2xl sm:text-3xl font-bold">Lista de tarefas :D</h1> -->
    </section>

    <section class="todo-container">
      <q-card>
        <q-card-section>
          <q-form class="form" @submit="handleSubmit">
            <h2 class="form-title">Adicionar tarefa</h2>
            <InputPrimary
              v-model="form.task"
              label="Tarefa *"
              placeholder="Digite a tarefa"
              lazy-rules="ondemand"
              :rules="[(val: string) => val.length > 0 || 'Campo obrigatório']"
            />
            <ButtonPrimary label="Adicionar" type="submit" class="form-btn" />
          </q-form>
        </q-card-section>
      </q-card>
    </section>

    <section class="tasks-container">
      <q-card>
        <q-card-section>
          <h2 class="tasks-title">Tarefas</h2>
        </q-card-section>
        <q-card-section v-if="tasks && tasks.length > 0" class="list">
          <CardMain v-for="(task, index) in tasks" :key="index">
            <q-card-section class="card-task-header">
              <p>
                <strong>Tarefa: {{ index + 1 }}</strong>
              </p>
              <div class="actions">
                <q-btn
                  flat
                  dense
                  color="secondary"
                  padding="0"
                  :icon="mdiNoteEdit"
                  @click="
                    () => {
                      handleEdit(task)
                    }
                  "
                />
                <q-btn
                  flat
                  dense
                  color="secondary"
                  padding="0"
                  :icon="mdiDelete"
                  @click="
                    () => {
                      handleDelete(task)
                    }
                  "
                />
              </div>
            </q-card-section>
            <q-card-section>
              <p class="break-words">{{ task.name_task }}</p>
            </q-card-section>
          </CardMain>
        </q-card-section>
        <q-card-section v-else class="empty-tasks">
          <q-icon :name="mdiNoteOffOutline" color="primary" class="icon" />
          <p>Nenhuma tarefa foi adicionada</p>
        </q-card-section>
      </q-card>
    </section>

    <ModalGenerico
      header-title="Editar tarefa"
      :header-description="`Alterando a tarefa: ${
        editingTask?.name_task ?? ''
      }`"
      v-model="activeEditModal"
      :handle-close-modal="closeModal"
    >
      <div class="modal-container">
        <q-form class="form-edit" @submit="handleSubmitEdit">
          <InputPrimary
            v-model="formEdit.task"
            label="Tarefa *"
            placeholder="Digite a tarefa"
            lazy-rules="ondemand"
            :rules="[(val: string) => val.length > 0 || 'Campo obrigatório']"
          />
          <ButtonPrimary
            label="Confirmar"
            type="submit"
            class="form-edit-btn"
          />
        </q-form>
      </div>
    </ModalGenerico>
  </q-page>
</template>

<script setup lang="ts">
import {
  addTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from '@/services/TodoService'
import { Task } from '@/types/interfaces/Task'
import {
  mdiDelete,
  mdiNoteEdit,
  mdiNoteOffOutline,
} from '@quasar/extras/mdi-v7'
import { useQuasar } from 'quasar'
import { onMounted, reactive, ref } from 'vue'
import CardMain from '@/components/Global/CardMain.vue'
import ModalGenerico from '@/components/Global/ModalGenerico.vue'
import InputPrimary from '@/components/Global/InputPrimary.vue'
import ButtonPrimary from '@/components/Global/ButtonPrimary.vue'
import { getStoredUser } from '@/services/UserService'

defineOptions({ name: 'IndexPage' })

const $q = useQuasar()
const activeEditModal = ref(false)
const tasks = ref<Task[]>([])
const editingTask = ref<Task | null>(null)
const form = reactive({
  task: '',
})
const formEdit = reactive({
  task: '',
})
const user = ref()

onMounted(async () => {
  $q.loading.show()
  await fetchTasks()
  $q.loading.hide()

  user.value = getStoredUser()
})

const fetchTasks = async () => {
  const data = await getAllTasks()

  if (!data) {
    return
  }

  tasks.value = data
}

const handleSubmit = async () => {
  if (!form.task) {
    return
  }

  const task: Task = {
    name_task: form.task,
  }

  const isSuccess = await addTask(task)

  if (isSuccess) {
    $q.notify({
      message: 'Adicionada com sucesso!',
      color: 'positive',
    })

    await fetchTasks()
  } else {
    $q.notify({
      message: 'Erro ao adicionar!',
      color: 'negative',
    })
  }

  form.task = ''
}

const handleEdit = (task: Task) => {
  editingTask.value = { ...task }
  formEdit.task = editingTask.value.name_task
  activeEditModal.value = true
}

const handleSubmitEdit = async () => {
  if (!formEdit.task) {
    return
  }

  const task: Task = {
    id_task: editingTask.value?.id_task,
    name_task: formEdit.task,
  }

  const isSuccess = await updateTask(task)

  if (isSuccess) {
    $q.notify({
      message: 'Atualizada com sucesso!',
      color: 'positive',
    })

    await fetchTasks()
    activeEditModal.value = false
  } else {
    $q.notify({
      message: 'Erro ao atualizar!',
      color: 'negative',
    })
  }

  editingTask.value = null
}

const handleDelete = async (task: Task) => {
  if (!task.id_task) {
    return
  }

  const isSuccess = await deleteTask(task.id_task)

  if (isSuccess) {
    $q.notify({
      message: 'Deletado com sucesso!',
      color: 'positive',
    })

    await fetchTasks()
  } else {
    $q.notify({
      message: 'Erro ao deletar!',
      color: 'negative',
    })
  }
}

const closeModal = () => {
  activeEditModal.value = false
}
</script>

<style scoped lang="scss">
.todo-container {
  margin-top: 2rem;
  width: 100%;
  max-width: 600px;

  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .form-title {
      font-size: 1.25rem;
    }

    .form-btn {
      align-self: flex-end;
    }
  }
}

.tasks-container {
  margin-top: 2rem;
  width: 100%;
  max-width: 600px;

  .tasks-title {
    font-size: 1.25rem;
  }

  .empty-tasks {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 4rem;
    padding-top: 2rem;
    text-align: center;

    .icon {
      font-size: 4rem;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .card-task-header {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    padding-bottom: 0;

    .actions {
      display: flex;
      gap: 0.5rem;
    }
  }
}

.modal-container {
  padding: 1rem;

  .form-edit {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .form-edit-btn {
      align-self: flex-end;
    }
  }

  @media screen and (min-width: $breakpoint-sm-min) {
    padding: 2rem;
  }
}
</style>

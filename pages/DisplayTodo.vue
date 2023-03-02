<template>
  <v-data-table :headers="headers" :items="allTable" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Todo List</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">

            <v-btn color="primary" to="/AddTodo" dark class="mb-2" v-bind="props">
              Add
            </v-btn>
          </template>
          <v-card v-model="valid">
            <v-card-title>
              <span class="text-h5">Edit Todo</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="todo" :rules="[required('Task')]" label="todo"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="description" :rules="[required('description')]"
                      label="description"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <!-- <v-checkbox @change="editModel(item)" v-model="model"></v-checkbox> -->
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" :disabled="!valid" @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm(deleteData)">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.model="{ item }">
      <v-checkbox :key="item.model" @change="editModel(item)" :label="item.model ? 'done' : 'pending'"
        v-model="item.model"></v-checkbox>

    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item.id)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import validations from "@/utils/validations";
export default {
  //middleware: 'guest',
  components: {


  },
  computed: {
    ...mapGetters(['allTable']),

    headers() {
      return [
        { text: 'ID', value: 'id' },
        { text: 'todo', value: 'todo' },
        { text: 'Description', value: 'description' },
        { text: 'Status', value: 'model' },
        { text: 'Actions', value: 'actions' }
      ]
    },
  },
  methods: {
    ...mapState(['todolist']),
    // ...mapActions(['fetchTodo']),
    deleteItem(id) {
      this.deleteData = id
      this.dialogDelete = true
    },
    closeDelete() {
      this.dialogDelete = false
    },
    deleteItemConfirm(id) {
      console.log(id)
      this.$store.dispatch('deleteTodo', id)
      this.dialogDelete = false

    },
    editItem(id) {

      this.dialog = true,
        this.id = id.id
      this.todo = id.todo,
        this.description = id.description,
        this.model = id.model
      // console.log(id.description)

    },
    editModel(data) {
      this.$store.dispatch('editTodo', data)
    },

    close() {
      this.dialog = false

    },
    save() {
      let edit = {
        id: this.id,
        todo: this.todo,
        description: this.description,
        model: this.model
      };

      this.$store.dispatch('editTodo', edit),
        console.log(edit)
      this.dialog = false
    },

  },

  created() {
    this.$store.dispatch('fetchTodo')
  },
  data() {
    return {
      valid: false,
      todo: '',
      model: false,
      description: '',
      dialog: false,
      dialogDelete: false,
      deleteData: '',
      ...validations
    }
  },
}
</script>
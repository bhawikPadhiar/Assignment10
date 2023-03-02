<template>
  <v-main>
    <div>
      <v-btn text to="/DisplayTodo">Back</v-btn>
    </div>
    <v-sheet width="300" class="mx-auto">
      <v-form ref="form" v-model="valid">
        <v-text-field v-model="todo" :rules="[required('Task')]" label="Task"></v-text-field>
        <v-text-field v-model="description" :rules="[required('Description')]" label="Description"></v-text-field>
        <v-btn type="button" @click="onSubmit" :disabled="!valid" block class="mt-2">Submit</v-btn>
        <v-dialog v-model="alert">
          <v-alert type="success"  icon="$success" text="Task Added"> Task Added
            Succesfully</v-alert></v-dialog>
      </v-form>
    </v-sheet>
  </v-main>
</template>
  
<script>
import validations from "@/utils/validations";
export default {

  methods: {
    onSubmit() {
      let addData = { todo: this.todo, description: this.description, model: this.model }
      this.$store.dispatch('addTodo', addData),
        this.$refs.form.reset(),
        this.alert = true;
      setTimeout(() => (this.alert = false), 2000);
    },

  },

  data: () => ({
    todo: '',
    alert: false,
    description: '',
    model: '',
    valid: false,
    showPassword: false,
    ...validations
  }),
}
</script>
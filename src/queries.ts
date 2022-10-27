import axios from 'axios'

export default {
  name: 'HelloWorld',
  data () {
    return {
      ingredients: []
    }
  },
  mounted () {
    this.get_Tasks();
  },
  methods: {
    get_Tasks() {
        axios({
            method:'get',
            url: 'http://127.0.0.1:8000/ingredients/',
            auth: {
                username: 'your username',
                password: 'your password'
            }
        }).then(response => this.tasks = response.data);
    }
  }
}

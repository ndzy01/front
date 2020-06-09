import {observable} from 'mobx'

  const store = observable(
    {
      id: "",
      sid: "",
      setId(id: string) {
        store.id = id
      },
      getId() {
        return store.id
      },
      setSId(sid: string) {
        store.sid = sid
      },
      getSId() {
        return store.sid
      },
    }
    )
export default store
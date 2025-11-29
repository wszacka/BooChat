export default function Login({ setLoginMenu, handleSubmit, myUsernameRef }) {
  return (
    <>
      <div>
        <h4>Log in</h4>
        <form onSubmit={handleSubmit}>
          <input
            ref={myUsernameRef}
            type="text"
            placeholder="Type your login"
          ></input>
          <button>Log in</button>
        </form>
        <button onClick={() => setLoginMenu(false)}>
          Dont have an account? Register!
        </button>
      </div>
    </>
  );
}

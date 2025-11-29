export default function Register({
  setLoginMenu,
  handleSubmit,
  myUsernameRef,
}) {
  return (
    <>
      <h4>Register</h4>
      <form onSubmit={handleSubmit}>
        <input
          ref={myUsernameRef}
          type="text"
          placeholder="Type your new login"
        ></input>
        <button>Register</button>
      </form>

      <button onClick={() => setLoginMenu(true)}>
        Have an account? Log in!
      </button>
    </>
  );
}

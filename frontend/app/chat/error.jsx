"use client";

export default function Error({ error }) {
  console.error(error);
  return (
    <p style={{ padding: "2rem", color: "red" }}>
      Something went wrong!: {error}
    </p>
  );
}

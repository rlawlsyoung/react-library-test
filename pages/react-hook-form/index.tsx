import { useForm } from "react-hook-form";

const ReactHookFormPages = ({}) => {
  const onSubmit = async (data: any) => {
    await new Promise((r) => setTimeout(r, 1000));
    alert(JSON.stringify(data));
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">이메일</label>
      <input
        id="email"
        type="text"
        placeholder="test@email.com"
        // aria-invalid={isDirty ? (errors.email ? "true" : "false") : undefined}
        aria-invalid={errors.email ? "true" : "false"}
        {...register("email", {
          required: "이메일은 필수 입력입니다.",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "이메일 형식에 맞지 않습니다.",
          },
        })}
      />{" "}
      {/* isDirty는 폼 내의 입력 필드가 수정될 때마다 업데이트됨. 폼 내의 필드 중 하나라도 수정됐다면 isDirty는 true가 됨. */}
      {/* aria-invalid 속성은 입력 필드의 유효성 검사 상태를 나타낸다. 이는 register 메소드의 rules 객체 내에 정의된 유효성 검사 규칙에 따라 자동으로 설정됨 ++ 기본값은 false, 즉 문제가 없다는 뜻 */}
      <br />
      {errors.email && (
        <small role="alert">{errors.email.message?.toString()}</small>
      )}
      <br />
      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        type="password"
        placeholder="****************"
        // aria-invalid={
        //   isDirty ? (errors.password ? "true" : "false") : undefined
        // }
        {...register("password", {
          required: "비밀번호는 필수 입력입니다.",
          minLength: {
            value: 8,
            message: "8자리 이상 비밀번호를 사용하세요.",
          },
        })}
      />
      <br />
      {errors.password && (
        <small role="alert">{errors.password.message?.toString()}</small>
      )}
      <br />
      <button type="submit" disabled={isSubmitting}>
        로그인
      </button>
    </form>
  );
};

export default ReactHookFormPages;

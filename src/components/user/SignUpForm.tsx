import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "./\bInputForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

const SignUpSchema = z
	.object({
		email: z
			.string()
			.nonempty({ message: "이메일을 입력하세요" })
			.email({ message: "이메일 형식이 아닙니다." }),
		password: z
			.string()
			.nonempty({ message: "비밀번호를 입력하세요" })
			.min(8, { message: "비밀번호는 8자 이상으로 입력하세요" })
			.max(16, { message: "비밀번호는 16자 이하로 입력하세요" }),
		passwordConfirm: z.string().nonempty({ message: "확인 비밀번호를 입력하세요" }),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: "비밀번호가 일치하지 않습니다.",
		path: ["passwordConfirm"],
	});

const SignUpForm = () => {
	const navigate = useNavigate();
	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<z.infer<typeof SignUpSchema>>({
		resolver: zodResolver(SignUpSchema),
		defaultValues: { email: "", password: "", passwordConfirm: "" },
	});

	const onSubmit = (data: { email: string; password: string; passwordConfirm: string }) => {
		localStorage.setItem(
			"register",
			JSON.stringify({ email: data.email, password: data.password }),
		);
		alert("회원가입 성공");
		navigate("/login");
	};

	const buttonList = [
		{ label: "google", color: "gray" },
		{ label: "facebook", color: "blue" },
		{ label: "github", color: "black" },
		{ label: "kakao", color: "yellow" },
	];

	return (
		<div>
			{/* 회원가입 폼 */}
			<div className="relative rounded-xl bg-white p-6 shadow-lg">
				{/* 타이틀 */}
				<h2 className="text-center text-2xl font-bold text-gray-800">회원가입</h2>
				<p className="mb-6 mt-2 text-center text-sm text-gray-500">
					이메일 혹은 소셜로 회원가입 하세요
				</p>

				{/* 소셜 회원가입 버튼 */}
				<div className="mb-6 flex justify-center gap-3">
					{buttonList.map((button, index) => (
						<button
							key={index}
							className="rounded-full bg-gray-100 p-3 shadow transition hover:bg-gray-200"
						>
							<i className={`fab fa-${button.label} text-${button.color}-600`}></i>
						</button>
					))}
				</div>

				{/* 이메일 및 비밀번호 입력 */}
				<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
					<Input
						className="w-full rounded-lg border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
						name="email"
						type="text"
						control={control}
						placeholder="이메일을 입력하세요"
						errors={errors}
					/>

					<Input
						className="w-full rounded-lg border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
						name="password"
						type="password"
						control={control}
						placeholder="비밀번호를 입력하세요"
						errors={errors}
					/>
					<Input
						className="w-full rounded-lg border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
						name="passwordConfirm"
						type="password"
						control={control}
						placeholder="비밀번호를 확인해주세요"
						errors={errors}
					/>
					<button
						type="submit"
						className="w-full rounded-lg bg-indigo-500 py-2 text-white transition hover:bg-indigo-600"
					>
						회원가입
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignUpForm;

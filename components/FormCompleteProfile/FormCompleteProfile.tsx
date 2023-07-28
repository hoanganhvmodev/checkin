"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import apiCompleteProfile from "@/api/complete-profile";
import { Department, Departments } from "@/interfaces/profile";

interface FormData {
  code: number;
  department_id: number;
  center: string;
}
interface ValueDepartment {
  value: number;
  label: string;
}

interface PropsSubmit {
  handleForm: (value: any) => void;
}

export default function FormCompleteProfile({ handleForm }: PropsSubmit) {
  const [department, setDepartment] = useState<Departments>();
  const optionDepartment: ValueDepartment[] = [];
  const schema = yup
    .object({
      code: yup.number().min(4).positive().integer().required(),
      department_id: yup.number().positive().integer().required(),
      center: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    handleForm(data);
  };

  const getDepartment = async () => {
    const departments = await apiCompleteProfile
      .getDepartMent()
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
    setDepartment(departments);
  };

  useEffect(() => {
    getDepartment();
  }, [getDepartment.length]);

  const optionSelect = () => {
    department &&
      Array.isArray(department.departments) &&
      department.departments.map((value: Department) => {
        optionDepartment.push({
          value: value.id,
          label: value.name,
        });
      });
  };
  optionSelect();

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col pb-12 pt-8 px-10 border rounded-lg bg-[#f3f3ed] w-[460px] mx-auto max-w-screen-xl shadow-lg"
      >
        <div className="flex justify-start text-[#da783f] font-bold text-xl mb-8">
          COMPLETE PROFILE
        </div>
        <div className="flex flex-col mb-8">
          <label>ID nhân viên</label>
          <input
            className="outline-none p-2 border mt-2"
            type="number"
            placeholder="ID nhân viên"
            {...register("code")}
          />
          {errors.code && (
            <span className="text-[red]">{errors.code?.message}</span>
          )}
        </div>
        <div className="flex flex-col mb-8">
          <label>Tòa nhà làm việc</label>
          <select
            {...register("department_id")}
            className="outline-none p-2 border mt-2"
          >
            {optionDepartment.map((value, index) => {
              return (
                <option value={value.value} key={index}>
                  {value.label}
                </option>
              );
            })}
          </select>
          {errors.department_id && (
            <span className="text-[red]">{errors.department_id?.message}</span>
          )}
        </div>
        <div className="flex flex-col mb-16">
          <label>Bộ phần làm việc</label>
          <select
            {...register("center")}
            className="outline-none p-2 border mt-2"
          >
            <option value="DU10">DU10</option>
            <option value="DU11">DU11</option>
            <option value="DU12">DU12</option>
          </select>
          {errors.center && (
            <span className="text-[red]">{errors.center?.message}</span>
          )}
        </div>
        <input
          type="submit"
          className="p-2 border text-[white] bg-[#66a166] hover:bg-[green] cursor-pointer"
        />
      </form>
    </div>
  );
}

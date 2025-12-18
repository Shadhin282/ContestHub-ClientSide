import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { imageUpload } from '../../utils';


export function ContestForm({
  initialData,
  onSubmit,
  isLoading
}) {

  
  const {
    register,
    control,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    defaultValues: {
      name: initialData?.name || '',
      image: imageProcess || '',
      description: initialData?.description || '',
      price: initialData?.price || 0,
      prizeMoney: initialData?.prizeMoney || 0,
      taskInstruction: initialData?.taskInstruction || '',
      type: initialData?.type || 'Image Design',
      deadline: initialData?.deadline ? new Date(initialData.deadline) : new Date(Date.now() + 86400000)
    }
  });


  const contestTypes = [{
    value: 'Image Design',
    label: 'Image Design'
  }, {
    value: 'Article Writing',
    label: 'Article Writing'
  }, {
    value: 'Business Idea',
    label: 'Business Idea'
  }, {
    value: 'Gaming Review',
    label: 'Gaming Review'
    }];
  
  return <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Input label="Contest Name" {...register('name', {
        required: 'Name is required'
      })} error={errors.name?.message} />

      <Select label="Contest Type" options={contestTypes} {...register('type')} />
    </div>

    <Input label="Cover Image URL" type="file" placeholder="https://..." {...register('image', {
      required: 'Image URL is required'
    })} error={errors.image?.message} />

    <Textarea label="Description" {...register('description', {
      required: 'Description is required'
    })} error={errors.description?.message} />

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Input label="Entry Fee ($)" type="number" {...register('price', {
        required: 'Price is required',
        min: 0
      })} error={errors.price?.message} />

      <Input label="Prize Money ($)" type="number" {...register('prizeMoney', {
        required: 'Prize money is required',
        min: 0
      })} error={errors.prizeMoney?.message} />

      <div className="w-full">
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          Deadline
        </label>
        <Controller control={control} name="deadline" render={({
          field
        }) => <DatePicker selected={field.value} onChange={date => field.onChange(date)} className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" minDate={new Date()} showTimeSelect dateFormat="MMMM d, yyyy h:mm aa" />} />
      </div>
    </div>

    <Textarea label="Task Instructions" placeholder="Explain what participants need to do..." {...register('taskInstruction', {
      required: 'Instructions are required'
    })} error={errors.taskInstruction?.message} className="min-h-[150px]" />

    <div className="pt-4">
      <Button type="submit" isLoading={isLoading} className="w-full md:w-auto">
        {initialData ? 'Update Contest' : 'Create Contest'}
      </Button>
    </div>
  </form>;
}
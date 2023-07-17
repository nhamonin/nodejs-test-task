import React, { useState } from 'react';

const useInput = (initialValue: string | FileList | null, type: string) => {
  const [value, setValue] = useState<string | FileList | null>(initialValue);

  return {
    value,
    reset: () => setValue(type === 'file' ? null : ''),
    bind: {
      value: type !== 'file' ? (value as string) : undefined,
      files: type === 'file' ? (value as FileList) : undefined,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (type === 'file') {
          setValue(event.target.files);
        } else {
          setValue(event.target.value);
        }
      },
    },
  };
};

const formatErrorMessage = (message: string | Array<string>): string => {
  if (Array.isArray(message)) {
    return message.join(', ');
  }
  return message;
};

interface FormField {
  name: string;
  type: string;
  label: string;
  required?: boolean;
}

interface FormProps {
  fields: FormField[];
  endpoint: string;
  buttonLabel: string;
  onSuccess: (accessToken?: string, user_id?: string) => void;
  multipart?: boolean;
}

const Form = ({
  fields,
  endpoint,
  buttonLabel,
  onSuccess,
  multipart = false,
}: FormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const inputs = fields.map((field) =>
    useInput(field.type === 'file' ? null : '', field.type),
  );

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    if (fields.some((field, i) => field.required && !inputs[i].value)) {
      setMessage('Please fill all required fields');
      return;
    }

    setIsLoading(true);
    try {
      let response;
      if (multipart) {
        const data = new FormData();
        fields.forEach((field, i) => {
          if (field.type === 'file') {
            if (inputs[i].value) {
              data.append(field.name, (inputs[i].value as FileList)[0]);
            }
          } else {
            data.append(field.name, inputs[i].value as string);
          }
        });

        response = await fetch(endpoint, {
          method: 'POST',
          body: data,
        });
      } else {
        const data = Object.fromEntries(
          fields.map((field, i) => [field.name, inputs[i].value as string]),
        );

        response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      }

      if (!response.ok) {
        throw {
          message: (await response.json()).message,
          status: response.status,
        };
      } else {
        inputs.forEach((input) => input.reset());
        const { access_token } = await response.json();
        onSuccess(access_token || null);
      }
    } catch (error: any) {
      console.log(error);
      setMessage(formatErrorMessage(error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-blue-300 p-8">
      <h1 className="text-3xl font-bold mb-4">{buttonLabel}</h1>
      {message && (
        <div className="my-4 p-2 bg-red-100 border-l-4 border-red-500 text-red-700 rounded mx-auto text-center">
          {message}
        </div>
      )}

      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        {fields.map((field, i) => (
          <div key={i} className="mb-4">
            <label htmlFor={field.name} className="block mb-2 font-bold">
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.name}
              className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900"
              {...inputs[i].bind}
            />
          </div>
        ))}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 ${
              isLoading ? 'opacity-50' : ''
            }`}
          >
            {isLoading ? 'Processing...' : buttonLabel}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;


"use client";
import UserForm from '@/components/users/user-add-edit'

type Props = {
    params: { userid: string };
    searchParams: {
      code: string;
    };
};

export default function EditUser({ params, searchParams}:Props){


    return(
        <div>
            {params.userid ?
            <UserForm id={parseInt(params.userid)}/>: null}
        </div>
    )
}
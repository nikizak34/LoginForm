import {useController, useForm} from 'react-hook-form'
import s from './LoginForm.module.css'
import * as Checkbox from '@radix-ui/react-checkbox';
import {CaretDownIcon, CheckIcon} from "@radix-ui/react-icons";
import * as Switch from '@radix-ui/react-switch';
import {Button, DropdownMenu} from '@radix-ui/themes';

type FormValues = {
    username: string
    password: string
    label: string
    rememberMe: boolean
    toggle: boolean
    radioSelection: boolean
    dropdownTitle: string
}

export const LoginForm = () => {
    const {
        control, register, handleSubmit,
        formState: {errors, isValid}
    } = useForm<FormValues>(
        {mode: 'onChange'}
    )

    const onSubmit = (data: FormValues) => {
        alert(JSON.stringify(data))
    }


    const {
        field: {value, onChange},
    } = useController({
        name: 'rememberMe',
        control,
        defaultValue: false,
    })

    const {
        field,
    } = useController({
        name: 'toggle',
        control,
        defaultValue: true,
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className={s.label}>Username</div>
                <input className={s.input}
                       {...register('username', {
                           required: 'Email is required',
                           minLength: {value: 5, message: 'username has to be at least 5 characters long'},

                       })}
                       placeholder={'Enter username'}
                />
            </div>
            {errors.username && (
                <div className={s.error}>{errors.username?.message}</div>
            )}
            <div>
                <div className={s.label}>Password</div>
                <input className={s.input} {...register('password', {
                    required: 'Password is required',
                    minLength: {value: 4, message: 'Password has to be at least 3 characters long'},
                    maxLength: {value: 12, message: 'The password must be no more than 12 characters.'},
                })} placeholder={'Enter password'}

                />
            </div>
            {errors.password ? (
                <div className={s.error}>{errors.password?.message}</div>
            ) : <div style={{color: '#666666', fontSize: '12px'}}>Your password is between 4 and 12 characters</div>}
            <div className={s.label}>Input Text Label</div>
            <input className={s.input} placeholder={'Type here'} {...register('label',
                {maxLength: {value: 100, message: 'Maximum number of characters 100'}})}/>
            {errors.label && (
                <div className={s.error}>{errors.label?.message}</div>
            )}
            <div>
                <div>
                    <Checkbox.Root onCheckedChange={onChange} checked={value} className={s.checkbox}>
                        <Checkbox.Indicator>
                            <CheckIcon className={s.checkboxIcon}/>
                        </Checkbox.Indicator>
                    </Checkbox.Root>
                    <span>Remember me</span>
                </div>

                <div>
                    <Switch.Root onCheckedChange={field.onChange} checked={field.value} className={s.switchRoot}>
                        <Switch.Thumb className={s.switchThumb}/>
                    </Switch.Root>
                    <span>Off</span>
                </div>

                <div>
                    <div>
                        <input type="radio" value={'selection 1'} {...register('radioSelection',)}
                               className={s.radio}/>Radio selection 1
                    </div>
                    <div>
                        <input type="radio" value={'selection 2'} {...register('radioSelection',)}
                               className={s.radio}/>Radio selection 2
                    </div>
                    <div>
                        <input type="radio" value={'selection 3'} {...register('radioSelection',)}
                               className={s.radio}/>Radio selection 3
                    </div>

                    <div>
                        <div className={s.label}>Dropdown Title</div>
                        <DropdownMenu.Root {...register('dropdownTitle')} >
                            <DropdownMenu.Trigger
                                style={{
                                    width: '594px', height: '56px',
                                    backgroundColor: 'white', border: '1px solid #CCCCCC',
                                    color: '#666666'
                                }}

                            >
                                <Button variant="soft" style={{justifyContent: 'left'}}>
                                    Dropdown option
                                    <CaretDownIcon/>
                                </Button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content style={{width: '594px'}}>
                                <DropdownMenu.Item>Dropdown option</DropdownMenu.Item>
                                <DropdownMenu.Separator/>
                                <DropdownMenu.Item>Dropdown option 1</DropdownMenu.Item>
                                <DropdownMenu.Separator/>
                                <DropdownMenu.Item>Dropdown option 2</DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </div>

                    <button className={s.buttonClose} type={"reset"}>Cancel</button>
                    <button disabled={!isValid} className={isValid ? s.button : s.disButton} type="submit">Next</button>
                </div>

            </div>

        </form>
    )
}




import { FC, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import styles from './googlebtn.module.css';

type TPromptOneTap = {
  isNotDisplayed: () => boolean,
  isSkippedMoment: () => boolean
};

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: ({
            client_id,
            callback,
            auto_select,
            state_cookie_domain,
            cancel_on_tap_outside,
            use_fedcm_for_prompt
          }: {
            client_id: string,
            callback: (data: any) => void,
            auto_select?: boolean,
            state_cookie_domain?: string,
            cancel_on_tap_outside?: boolean
            use_fedcm_for_prompt?: boolean
          }) => void,
          renderButton: (div: HTMLDivElement, { theme, size }: { theme: string, size: string }) => void,
          prompt: (data?: (data: TPromptOneTap) => void) => void,
          disableAutoSelect: () => void
        }
      }
    }
  }
}

type TProps = {
  onSuccess: (data: any) => void;
};

const loadingScript = (src: string) => {
  return new Promise<boolean>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      return resolve(true);
    }

    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = (err) => reject(err);
    document.body.append(script);
  });
};

const GoogleBtn: FC<TProps> = ({ onSuccess }) => {
  const container = useRef<HTMLDivElement>(null);
  const { data } = useSWR('https://accounts.google.com/gsi/client', loadingScript, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const [isShowGoogle, setIsShowGoogle] = useState(false);


  useEffect(() => {
    if (!data) {
      return;
    }

    const id = '';

    window.google.accounts.id.initialize({
      client_id: id,
      auto_select: false,
      callback: googleCallback,
      cancel_on_tap_outside: false,
      use_fedcm_for_prompt: false,
    });

    window.google.accounts.id.prompt((notification) => {
      console.log('prompt');
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        setIsShowGoogle(true);
      } else {
        setIsShowGoogle(false);
      }
    });

    window.google.accounts.id.renderButton(
      container.current!,
      { theme: 'outline', size: 'large' }
    );
  }, [data]);

  const googleCallback = (data: any) => {
    console.log('data = ', data);
    setIsShowGoogle(false);
    onSuccess(data);
  }

  // useEffect(() => {
  //   console.log('useEffect isShowGoogle = ', isShowGoogle);
  //   if(!container.current){
  //     return;
  //   }
  //   console.log('useEffect isShowGoogle = ', isShowGoogle);
  //   if (isShowGoogle) {
  //     container.current.hidden = false;
  //   } else {
  //     console.log('hidden');
  //     container.current.hidden = true;
  //   }
  // }, [isShowGoogle, container]);

  return (
    <>
      <div className={`${styles.googleContBtn} ${isShowGoogle?styles.googleContBtnShow:styles.googleContBtnHidden}`} ref={container}></div>
    </>
  );
};

export default GoogleBtn;
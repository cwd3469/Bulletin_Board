import Link from 'next/link';
import GnbBody from './GnbBody';
import { GnbItem, GnbLink } from '../styled';
import { useGnb } from './useGnb';

export const Gnb = (props: { disabled?: boolean }) => {
  const { disabled } = props;
  const { itmeMenuActive, activeChildren } = useGnb();

  return (
    <GnbBody disabled={disabled}>
      <>
        <GnbLink
          href="/preparation/request"
          style={itmeMenuActive('request')}
          disabled={disabled}
        >
          조제 요청
        </GnbLink>
        <GnbLink
          href="/preparation/proceed"
          style={itmeMenuActive('proceed')}
          disabled={disabled}
        >
          조제 진행
        </GnbLink>
        <GnbLink
          href="/preparation/history"
          style={itmeMenuActive('history')}
          disabled={disabled}
        >
          조제 내역
        </GnbLink>
        <GnbLink
          href="/setting/business-hours"
          style={itmeMenuActive('business-hours')}
          disabled={disabled}
        >
          설정
        </GnbLink>
        <GnbLink
          href="/setting/security"
          style={itmeMenuActive('security')}
          disabled={disabled}
        >
          보안 설정
        </GnbLink>
        {/* <GnbLink
          href="/notice"
          style={itmeMenuActive('notice')}
          disabled={disabled}
        >
          공지사항
        </GnbLink> */}
      </>
    </GnbBody>
  );
};

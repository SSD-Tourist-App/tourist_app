import type { FC } from 'react';

interface SvgComponentProps {
    color?: string;
    width?: string;
    height?: string;
}

const GoogleIcon: FC<SvgComponentProps> = ({ color = "black", width = "35", height = "35" }) => {
    return (
        <div className="">
            <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
                <path d="M31.9458 14.8915H30.7711V14.831H17.6461V20.6643H25.8879C24.6855 24.06 21.4546 26.4976 17.6461 26.4976C12.814 26.4976 8.89614 22.5798 8.89614 17.7476C8.89614 12.9155 12.814 8.99764 17.6461 8.99764C19.8767 8.99764 21.9059 9.8391 23.451 11.2136L27.5759 7.08868C24.9713 4.66129 21.4874 3.16431 17.6461 3.16431C9.59249 3.16431 3.06281 9.69399 3.06281 17.7476C3.06281 25.8013 9.59249 32.331 17.6461 32.331C25.6998 32.331 32.2295 25.8013 32.2295 17.7476C32.2295 16.7698 32.1288 15.8153 31.9458 14.8915Z" fill="#FFC107" />
                <path d="M4.74426 10.9598L9.53562 14.4737C10.8321 11.2639 13.9719 8.99764 17.6461 8.99764C19.8767 8.99764 21.9059 9.8391 23.451 11.2136L27.5759 7.08868C24.9713 4.66129 21.4874 3.16431 17.6461 3.16431C12.0447 3.16431 7.18697 6.3267 4.74426 10.9598Z" fill="#FF3D00" />
                <path d="M17.6461 32.331C21.413 32.331 24.8357 30.8895 27.4235 28.5452L22.91 24.7258C21.3966 25.8767 19.5474 26.4992 17.6461 26.4977C13.853 26.4977 10.6323 24.079 9.41896 20.7037L4.66333 24.3678C7.07687 29.0906 11.9783 32.331 17.6461 32.331Z" fill="#4CAF50" />
                <path d="M31.9458 14.8916H30.7711V14.8311H17.6461V20.6644H25.8879C25.3127 22.2805 24.2767 23.6927 22.9078 24.7266L22.91 24.7251L27.4235 28.5445C27.1041 28.8347 32.2295 25.0394 32.2295 17.7477C32.2295 16.7699 32.1288 15.8154 31.9458 14.8916Z" fill="#1976D2" />
            </svg>
        </div>
    );
}
export { GoogleIcon };
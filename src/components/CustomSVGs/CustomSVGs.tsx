import styles from './CustomSVGs.module.css';

const CustomSVGs = ({ iconName }: { iconName: string }) => {
  switch (iconName) {
    case 'NextJS':
      return (
        <div className={styles.container}>
          <svg className={styles.svg} viewBox="100 0 300 300">
            <path d="M120.81043,80.5613102 L217.378325,80.5613102 L217.378325,88.2366589 L129.662487,88.2366589 L129.662487,146.003758 L212.147564,146.003758 L212.147564,153.679106 L129.662487,153.679106 L129.662487,217.101725 L218.384241,217.101725 L218.384241,224.777073 L120.81043,224.777073 L120.81043,80.5613102 Z M226.0292,80.5613102 L236.289538,80.5613102 L281.756922,143.983929 L328.230222,80.5613102 L391.441486,0 L287.591232,150.649363 L341.105941,224.777073 L330.443237,224.777073 L281.756922,157.314798 L232.869425,224.777073 L222.407904,224.777073 L276.324978,150.649363 L226.0292,80.5613102 Z M344.928421,88.2366588 L344.928421,80.5613102 L454.975585,80.5613102 L454.975585,88.2366589 L404.27744,88.2366589 L404.27744,224.777073 L395.425382,224.777073 L395.425382,88.2366589 L344.928421,88.2366588 Z M1.42108547e-14,80.5613102 L11.0650714,80.5613102 L163.64593,308.884007 L100.591558,224.777073 L9.25442331,91.4683847 L8.85205708,224.777073 L1.42108547e-14,224.777073 L1.42108547e-14,80.5613102 Z M454.083705,214.785469 C452.275167,214.785469 450.918762,213.38418 450.918762,211.573285 C450.918762,209.762388 452.275167,208.361099 454.083705,208.361099 C455.913774,208.361099 457.248648,209.762388 457.248648,211.573285 C457.248648,213.38418 455.913774,214.785469 454.083705,214.785469 Z M462.781915,206.334618 L467.518563,206.334618 C467.583153,208.900055 469.456284,210.624719 472.212151,210.624719 C475.290972,210.624719 477.03492,208.770705 477.03492,205.29982 L477.03492,183.310363 L481.85769,183.310363 L481.85769,205.321379 C481.85769,211.573285 478.240613,215.173518 472.255212,215.173518 C466.635824,215.173518 462.781915,211.681076 462.781915,206.334618 Z M488.166045,206.054362 L492.945754,206.054362 C493.354828,209.007848 496.239878,210.883419 500.395211,210.883419 C504.270652,210.883419 507.11264,208.878498 507.11264,206.119036 C507.11264,203.747625 505.304102,202.324777 501.191828,201.354653 L497.187209,200.384531 C491.56782,199.069474 489.005723,196.353129 489.005723,191.782772 C489.005723,186.24229 493.527071,182.555823 500.30909,182.555823 C506.617445,182.555823 511.224912,186.24229 511.504805,191.480955 L506.811217,191.480955 C506.359083,188.613703 503.861576,186.824365 500.244499,186.824365 C496.43365,186.824365 493.893085,188.656819 493.893085,191.459398 C493.893085,193.679901 495.52938,194.95184 499.577063,195.900406 L503.000368,196.741178 C509.373314,198.228702 512,200.815695 512,205.493846 C512,211.443935 507.392533,215.173518 500.029197,215.173518 C493.139526,215.173518 488.51053,211.6164 488.166045,206.054362 Z"></path>
          </svg>
        </div>
      );
    case 'React':
      return (
        <div className={styles.container}>
          <svg className={styles.svg} viewBox="0 -1.5 27 27">
            <path d="m15.902 11.974c0 1.331-1.079 2.41-2.41 2.41s-2.41-1.079-2.41-2.41 1.079-2.41 2.41-2.41 2.41 1.079 2.41 2.41z" />
            <path d="m13.491 17.494c-.201.005-.438.008-.676.008-2.811 0-5.522-.425-8.073-1.214l.193.051c-1.351-.436-2.522-1.079-3.541-1.903l.021.016c-.789-.571-1.32-1.455-1.41-2.467l-.001-.013c0-1.594 1.747-3.154 4.681-4.172 2.512-.827 5.403-1.304 8.405-1.304.139 0 .278.001.417.003h-.021c.116-.002.252-.003.389-.003 2.965 0 5.82.469 8.496 1.337l-.195-.055c1.305.424 2.438 1.036 3.433 1.814l-.024-.018c.775.546 1.298 1.404 1.386 2.387l.001.013c0 1.656-1.954 3.332-5.103 4.374-2.363.729-5.08 1.149-7.895 1.149-.17 0-.339-.002-.508-.005h.025zm0-9.84c-.106-.002-.232-.002-.358-.002-2.881 0-5.656.452-8.259 1.289l.191-.053c-2.698.941-3.908 2.228-3.908 3.087 0 .893 1.301 2.3 4.153 3.274 2.249.697 4.834 1.099 7.513 1.099.235 0 .469-.003.702-.009l-.034.001c.146.003.318.005.49.005 2.684 0 5.274-.4 7.715-1.143l-.187.049c2.96-.984 4.32-2.391 4.32-3.28-.102-.638-.462-1.176-.966-1.515l-.008-.005c-.866-.674-1.876-1.217-2.97-1.574l-.07-.02c-2.368-.766-5.093-1.208-7.92-1.208-.142 0-.283.001-.424.003h.021z" />
            <path d="m8.023 23.986c-.016 0-.035.001-.053.001-.453 0-.878-.119-1.245-.327l.013.007c-1.378-.8-1.858-3.092-1.28-6.141.697-3.128 1.827-5.894 3.344-8.4l-.069.124c1.499-2.655 3.31-4.926 5.425-6.872l.02-.018c.923-.844 2.003-1.537 3.187-2.028l.073-.027c.407-.196.885-.31 1.39-.31.501 0 .976.113 1.4.314l-.02-.008c1.435.826 1.911 3.36 1.238 6.606-.72 2.967-1.818 5.58-3.262 7.959l.07-.123c-1.452 2.63-3.209 4.882-5.266 6.819l-.014.013c-.958.877-2.083 1.59-3.321 2.082l-.074.026c-.46.181-.992.292-1.549.305h-.006zm1.205-14.447.499.288c-1.381 2.28-2.465 4.926-3.106 7.74l-.034.18c-.533 2.809-.019 4.498.72 4.926.191.102.417.161.657.161.02 0 .041 0 .061-.001h-.003c.955 0 2.458-.605 4.196-2.122 1.976-1.867 3.654-4.023 4.972-6.404l.068-.135c1.318-2.156 2.371-4.653 3.025-7.307l.038-.182c.629-3.058.086-4.93-.686-5.378-.238-.094-.514-.148-.802-.148-.364 0-.708.087-1.012.24l.013-.006c-1.118.465-2.078 1.086-2.907 1.846l.007-.006c-2.041 1.881-3.772 4.057-5.136 6.468l-.069.132z" />
            <path d="m18.96 24c-1.306 0-2.96-.787-4.69-2.276-2.175-1.983-4.017-4.282-5.464-6.834l-.072-.137c-1.43-2.349-2.551-5.075-3.215-7.975l-.036-.185c-.162-.709-.255-1.522-.255-2.357 0-.527.037-1.044.108-1.551l-.007.058c.085-.998.608-1.858 1.372-2.399l.01-.007c1.43-.83 3.865.024 6.342 2.228 2.022 1.914 3.748 4.113 5.118 6.54l.072.138c1.428 2.297 2.557 4.961 3.242 7.798l.038.186c.163.709.257 1.524.257 2.36 0 .577-.044 1.143-.13 1.696l.008-.062c-.103 1.022-.644 1.901-1.429 2.456l-.011.007c-.348.199-.764.316-1.207.316-.018 0-.036 0-.054-.001h.003zm-9.228-9.823c1.458 2.571 3.217 4.771 5.271 6.656l.02.018c2.166 1.863 3.884 2.266 4.628 1.834.773-.446 1.339-2.276.754-5.233-.702-2.89-1.787-5.434-3.219-7.741l.065.112c-1.379-2.456-3.027-4.562-4.948-6.384l-.012-.011c-2.334-2.074-4.225-2.54-4.998-2.094-.473.385-.784.952-.825 1.593v.007c-.055.39-.086.84-.086 1.298 0 .757.086 1.493.248 2.201l-.013-.066c.673 2.952 1.747 5.559 3.182 7.924l-.066-.117z" />
          </svg>
        </div>
      );
    case 'NodeJS':
      return (
        <div className={styles.container}>
          <svg className={styles.svg} viewBox="5 7 22 22">
            <path d="M5.304 16.563c0-0.095-0.050-0.183-0.132-0.23l-2.192-1.261c-0.037-0.022-0.079-0.033-0.121-0.035-0.004 0-0.020 0-0.023 0-0.042 0.002-0.083 0.013-0.121 0.035l-2.191 1.261c-0.082 0.047-0.133 0.135-0.133 0.23l0.005 3.396c0 0.047 0.025 0.091 0.066 0.114 0.041 0.024 0.091 0.024 0.132 0l1.302-0.746c0.082-0.049 0.132-0.135 0.132-0.23v-1.587c0-0.094 0.050-0.182 0.132-0.229l0.555-0.319c0.041-0.024 0.086-0.035 0.133-0.035 0.045 0 0.091 0.012 0.132 0.035l0.554 0.319c0.082 0.047 0.132 0.135 0.132 0.229v1.587c0 0.095 0.051 0.181 0.133 0.23l1.302 0.746c0.041 0.024 0.092 0.024 0.132 0 0.040-0.023 0.066-0.067 0.066-0.114l0.004-3.396zM17.006 11.894c-0.041-0.023-0.091-0.022-0.131 0.002s-0.065 0.067-0.065 0.114v3.363c0 0.033-0.018 0.064-0.046 0.080s-0.064 0.017-0.093 0l-0.549-0.316c-0.082-0.047-0.183-0.047-0.265 0l-2.192 1.265c-0.082 0.047-0.133 0.135-0.133 0.229v2.531c0 0.095 0.050 0.182 0.132 0.229l2.192 1.266c0.082 0.047 0.183 0.047 0.265 0l2.193-1.266c0.082-0.048 0.132-0.135 0.132-0.229v-6.309c0-0.096-0.052-0.184-0.136-0.231l-1.305-0.728zM16.803 18.331c0 0.024-0.012 0.046-0.033 0.057l-0.753 0.434c-0.020 0.012-0.046 0.012-0.066 0l-0.753-0.434c-0.021-0.012-0.033-0.034-0.033-0.057v-0.869c0-0.024 0.013-0.046 0.033-0.057l0.753-0.435c0.020-0.012 0.046-0.012 0.066 0l0.753 0.435c0.020 0.012 0.033 0.034 0.033 0.057v0.869zM24.85 17.439c0.081-0.047 0.132-0.134 0.132-0.229v-0.613c0-0.095-0.050-0.181-0.132-0.229l-2.178-1.265c-0.082-0.048-0.183-0.048-0.265-0l-2.192 1.265c-0.082 0.047-0.132 0.135-0.132 0.229v2.53c0 0.095 0.051 0.183 0.134 0.23l2.178 1.241c0.080 0.046 0.179 0.046 0.26 0.001l1.317-0.732c0.041-0.023 0.067-0.067 0.068-0.115s-0.025-0.092-0.066-0.116l-2.206-1.266c-0.041-0.023-0.066-0.067-0.066-0.115v-0.793c0-0.047 0.025-0.091 0.066-0.115l0.687-0.395c0.041-0.023 0.091-0.023 0.132 0l0.687 0.395c0.041 0.024 0.066 0.067 0.066 0.115v0.624c0 0.047 0.025 0.091 0.066 0.115s0.092 0.023 0.133-0l1.312-0.763zM9.291 15.090c0.082-0.047 0.183-0.047 0.265 0l2.192 1.265c0.082 0.047 0.132 0.134 0.132 0.229v2.532c0 0.095-0.051 0.182-0.132 0.229l-2.192 1.266c-0.082 0.047-0.183 0.047-0.265 0l-2.192-1.266c-0.082-0.047-0.132-0.135-0.132-0.229v-2.532c0-0.095 0.050-0.182 0.132-0.229l2.192-1.265zM29.106 20.647c-0.075 0-0.151-0.020-0.217-0.058l-0.69-0.408c-0.103-0.058-0.052-0.078-0.019-0.090 0.137-0.048 0.165-0.059 0.312-0.142 0.015-0.009 0.036-0.005 0.052 0.004l0.53 0.315c0.019 0.011 0.046 0.011 0.064 0l2.067-1.193c0.019-0.011 0.031-0.033 0.031-0.056v-2.386c0-0.023-0.012-0.045-0.032-0.057l-2.066-1.192c-0.019-0.011-0.045-0.011-0.064 0l-2.066 1.192c-0.020 0.011-0.033 0.034-0.033 0.057v2.386c0 0.023 0.013 0.044 0.032 0.055l0.566 0.327c0.307 0.154 0.495-0.027 0.495-0.209v-2.355c0-0.033 0.027-0.059 0.060-0.059h0.262c0.033 0 0.060 0.026 0.060 0.059v2.355c0 0.41-0.223 0.645-0.612 0.645-0.119 0-0.214 0-0.476-0.129l-0.542-0.312c-0.134-0.077-0.217-0.222-0.217-0.377v-2.386c0-0.155 0.083-0.3 0.217-0.377l2.067-1.194c0.131-0.074 0.305-0.074 0.434 0l2.067 1.194c0.134 0.077 0.217 0.222 0.217 0.377v2.386c0 0.155-0.083 0.299-0.217 0.377l-2.067 1.193c-0.066 0.038-0.141 0.058-0.218 0.058zM29.745 19.004c-0.905 0-1.094-0.415-1.094-0.764 0-0.033 0.026-0.059 0.060-0.059h0.267c0.030 0 0.055 0.022 0.059 0.051 0.040 0.272 0.16 0.41 0.708 0.41 0.435 0 0.621-0.099 0.621-0.329 0-0.133-0.052-0.232-0.729-0.298-0.565-0.056-0.915-0.181-0.915-0.633 0-0.417 0.352-0.666 0.941-0.666 0.662 0 0.99 0.23 1.031 0.723 0.002 0.017-0.004 0.033-0.016 0.046s-0.027 0.019-0.044 0.019h-0.268c-0.028 0-0.052-0.020-0.058-0.047-0.064-0.286-0.221-0.378-0.645-0.378-0.475 0-0.531 0.166-0.531 0.29 0 0.151 0.065 0.194 0.707 0.279 0.635 0.084 0.937 0.203 0.937 0.649 0 0.45-0.375 0.708-1.030 0.708zM22.506 17.321c0.016-0.009 0.035-0.009 0.051 0l0.421 0.243c0.016 0.009 0.026 0.026 0.026 0.044v0.486c0 0.018-0.010 0.035-0.026 0.044l-0.421 0.243c-0.016 0.009-0.035 0.009-0.051 0l-0.42-0.243c-0.016-0.009-0.025-0.026-0.025-0.044v-0.486c0-0.018 0.010-0.035 0.025-0.044l0.42-0.243z" />
          </svg>
        </div>
      );
    case 'Angular':
      return (
        <div className={styles.container}>
          <svg className={styles.svg} viewBox="0 0 24 24">
            <path d="M12,2.5l8.84,3.15L19.5,17.35,12,21.5,4.5,17.35,3.16,5.65,12,2.5m0,2.1L6.47,17H8.53l1.11-2.78h4.7L15.45,17H17.5L12,4.6m1.62,7.9H10.39L12,8.63Z" />
          </svg>
        </div>
      );
    case 'Python':
      return (
        <div className={styles.container}>
          <svg className={styles.svg} viewBox="0 0 20 20">
            <g
              id="Dribbble-Light-Preview"
              transform="translate(-340.000000, -7599.000000)"
            >
              <g id="icons" transform="translate(56.000000, 160.000000)">
                <path d="M296.744,7457.45798 C296.262,7457.45798 295.872,7457.06594 295.872,7456.58142 C295.872,7456.0969 296.262,7455.70587 296.744,7455.70587 C297.226,7455.70587 297.616,7456.0969 297.616,7456.58142 C297.616,7457.06594 297.226,7457.45798 296.744,7457.45798 M294.072,7459 C299.15,7459 298.833,7456.78649 298.833,7456.78649 L298.827,7454.49357 L293.982,7454.49357 L293.982,7453.80499 L300.751,7453.80499 C300.751,7453.80499 304,7454.17591 304,7449.02614 C304,7443.87636 301.165,7444.0583 301.165,7444.0583 L299.472,7444.0583 L299.472,7446.44873 C299.472,7446.44873 299.563,7449.29855 296.682,7449.29855 L291.876,7449.29855 C291.876,7449.29855 289.176,7449.25533 289.176,7451.9222 L289.176,7456.33112 C289.176,7456.33112 288.766,7459 294.072,7459 M291.257,7440.54202 C291.739,7440.54202 292.128,7440.93406 292.128,7441.41858 C292.128,7441.9031 291.739,7442.29413 291.257,7442.29413 C290.775,7442.29413 290.385,7441.9031 290.385,7441.41858 C290.385,7440.93406 290.775,7440.54202 291.257,7440.54202 M293.928,7439 C288.851,7439 289.168,7441.21351 289.168,7441.21351 L289.174,7443.50643 L294.019,7443.50643 L294.019,7444.19501 L287.249,7444.19501 C287.249,7444.19501 284,7443.82409 284,7448.97386 C284,7454.12364 286.836,7453.9417 286.836,7453.9417 L288.528,7453.9417 L288.528,7451.55127 C288.528,7451.55127 288.437,7448.70145 291.319,7448.70145 L296.124,7448.70145 C296.124,7448.70145 298.824,7448.74467 298.824,7446.0778 L298.824,7441.66888 C298.824,7441.66888 299.234,7439 293.928,7439"></path>
              </g>
            </g>
          </svg>
        </div>
      );
    case 'HTML':
      return (
        <div className={styles.container}>
          <svg className={styles.svg} viewBox="0 0 512 512">
            <path
              d="M108.669,0.501h23.032v22.756h21.069V0.501h23.034V69.41h-23.032V46.334h-21.069V69.41h-23.032V0.501
		H108.669z M206.091,23.353h-20.275V0.501h63.594v22.852h-20.285V69.41h-23.032V23.353H206.091z M259.502,0.501h24.02l14.771,24.213
		l14.759-24.213h24.023V69.41h-22.938V35.256l-15.845,24.5h-0.395l-15.856-24.5V69.41h-22.539V0.501z M348.54,0.501h23.038v46.133
		h32.391V69.41H348.54V0.501z M74.987,100.926l32.946,369.533l147.844,41.04L404.031,470.4l32.981-369.475H74.987z M368.289,188.62
		l-2.063,22.977l-0.906,10.188h-0.149H256h-0.158h-63.956l4.142,46.407h59.814H256h92.98h12.214l-1.106,12.172l-10.65,119.32
		l-0.682,7.652L256,433.045v0.008l-0.208,0.059l-92.839-25.774l-6.351-71.161h20.97h24.527l3.227,36.146l50.474,13.632l0.042-0.013
		v-0.004l50.551-13.64l5.257-58.781H256h-0.158H154.578L143.439,188.62l-1.085-12.157h113.488H256h113.374L368.289,188.62z"
            ></path>
          </svg>
        </div>
      );
    case 'JS':
      return (
        <div className={styles.container}>
          <svg className={styles.svg} viewBox="0 0 20 20">
            <g
              id="Dribbble-Light-Preview"
              transform="translate(-420.000000, -7479.000000)"
            >
              <g id="icons" transform="translate(56.000000, 160.000000)">
                <path
                  d="M379.328,7337.432 C377.583,7337.432 376.455,7336.6 375.905,7335.512 L375.905,7335.512 L377.435,7334.626 C377.838,7335.284 378.361,7335.767 379.288,7335.767 C380.066,7335.767 380.563,7335.378 380.563,7334.841 C380.563,7334.033 379.485,7333.717 378.724,7333.391 C377.368,7332.814 376.468,7332.089 376.468,7330.558 C376.468,7329.149 377.542,7328.075 379.221,7328.075 C380.415,7328.075 381.275,7328.491 381.892,7329.578 L380.429,7330.518 C380.107,7329.941 379.758,7329.713 379.221,7329.713 C378.67,7329.713 378.321,7330.062 378.321,7330.518 C378.321,7331.082 378.67,7331.31 379.476,7331.659 C381.165,7332.383 382.443,7332.952 382.443,7334.814 C382.443,7336.506 381.114,7337.432 379.328,7337.432 L379.328,7337.432 Z M375,7334.599 C375,7336.546 373.801,7337.575 372.136,7337.575 C370.632,7337.575 369.731,7337 369.288,7336 L369.273,7336 L369.266,7336 L369.262,7336 L370.791,7334.931 C371.086,7335.454 371.352,7335.825 371.996,7335.825 C372.614,7335.825 373,7335.512 373,7334.573 L373,7328 L375,7328 L375,7334.599 Z M364,7339 L384,7339 L384,7319 L364,7319 L364,7339 Z"
                  id="javascript-[#155]"
                ></path>
              </g>
            </g>
          </svg>
        </div>
      );
    case 'CSS':
      return (
        <div className={styles.container}>
          <svg className={styles.svg} viewBox="0 0 512 512">
            <path
              d="M204.064,46.682v22.018h-56.302V0.501h56.302v24.13h-32.172v22.051H204.064z M261.941,24.631h22.492
		V0.501h-56.308c0,0,0,12.112,0,24.13c7.533,7.533,11.461,11.139,22.356,22.034c-6.369,0-22.356,0.022-22.356,0.021v22.014h56.308
		V46.682L261.941,24.631z M341.746,24.631h22.49V0.501H307.93c0,0,0,12.112,0,24.13c7.531,7.533,11.461,11.139,22.355,22.034
		c-6.365,0-22.355,0.022-22.355,0.021v22.014h56.307V46.682L341.746,24.631z M438.395,101.112l-34.203,370.486l-148.193,39.9
		l-148.196-39.9L73.605,101.112H438.395z M369.477,176.444H255.865h-115.62l5.529,44.739h110.091h6.184l-6.184,2.574
		l-106.067,44.177l3.518,43.73l102.549,0.333l54.963,0.175l-3.521,58.311l-51.442,14.484v-0.046l-0.422,0.116l-49.684-12.542
		l-3.015-36.195h-0.164h-46.085h-0.162l6.032,69.876l93.5,27.649v-0.05l0.168,0.05l93-27.146L361.1,267.935H255.865h-0.26
		l0.26-0.112l109.086-46.639L369.477,176.444z"
            ></path>
          </svg>
        </div>
      );
    case 'Java':
      return (
        <div className={styles.container}>
          <svg className={styles.svg} viewBox="0 0 512 512">
            <g id="5151e0c8492e5103c096af88a51e8d81">
              <path
                display="inline"
                d="M193.918,208.369c-4.729-10.456-6.849-22.652-3.236-33.731c3.612-11.327,11.703-20.413,19.794-28.878
		c22.525-22.531,50.285-39.085,72.316-61.986c12.197-12.573,22.278-27.634,25.762-44.937c2.864-12.695,1.496-25.764-1.117-38.337
		c11.7,13.319,15.559,32.363,12.197,49.541c-3.608,19.292-14.316,36.344-26.886,51.031c-10.081,11.827-21.659,22.282-33.731,31.993
		c-14.065,11.327-27.88,23.524-36.716,39.457c-7.472,12.943-9.215,28.876-4.11,42.942c8.341,24.146,27.756,42.071,38.338,64.848
		c-11.703-10.332-23.152-21.036-33.86-32.361C211.471,236.001,200.889,223.307,193.918,208.369z M257.398,189.448
		c-2.115,19.792,8.213,38.462,20.539,53.151c5.972,6.596,11.076,14.687,11.323,23.899c0.251,12.318-6.716,23.774-15.684,31.861
		c2.119-0.246,3.612-2.115,5.355-3.11c13.443-8.589,26.385-19.418,32.982-34.227c4.357-10.083,3.362-22.034-2.362-31.371
		c-6.724-10.953-15.559-20.662-20.786-32.61c-2.867-6.721-3.862-14.562-1.496-21.657c3.114-9.583,9.834-17.426,16.93-24.272
		c19.54-18.544,43.189-31.743,65.844-46.179c-28.629,8.214-56.883,19.542-81.03,37.343
		C273.702,153.727,259.515,169.658,257.398,189.448z M393.447,283.052c13.568,0.748,26.882,10.704,29.374,24.397
		c2.366,11.825-3.358,23.524-10.705,32.485c-12.075,14.438-28.382,24.771-44.807,33.609c-1.622,0.991-2.99,2.237-4.235,3.608
		c21.659-5.478,43.314-13.689,60.867-27.756c9.705-8.091,18.294-18.799,20.163-31.619c1.743-11.076-2.86-22.528-11.077-29.871
		c-9.96-9.09-24.021-12.448-37.218-10.704c-7.593,0.995-15.931,2.613-21.158,8.961C380.877,284.921,386.971,282.429,393.447,283.052
		z M123.22,318.647c16.303,4.357,33.108,5.603,49.787,6.724c14.936,0.995,29.875,1.246,44.937,1.12
		c38.833-0.619,77.916-3.236,116.003-11.699c3.608-0.87,7.593-1.493,10.833-3.733c6.347-4.11,13.313-7.347,20.162-10.583
		c-30.995,4.979-62.113,9.215-93.478,11.205c-31.74,1.991-63.731,3.236-95.593,1.121c-9.086-0.87-18.423-1.371-26.886-4.858
		c-1.994-0.87-4.733-2.609-3.738-5.227c1.869-3.361,5.603-4.977,8.839-6.72c13.694-6.473,28.629-10.081,43.193-14.313
		c-25.021-0.376-49.916,5.971-72.814,15.806c-5.105,2.491-10.83,4.481-14.936,8.714c-1.622,1.739-1.622,4.732,0.247,6.222
		C113.511,315.787,118.487,317.28,123.22,318.647z M324.864,352.88c-21.784,3.859-43.694,7.472-65.726,8.589
		c-24.147,1.618-48.294,0.247-72.191-2.241c-4.604-0.623-9.211-1.368-13.317-3.483c-2.116-1.246-4.231-3.236-4.106-5.854
		c0.247-4.106,3.73-6.967,6.222-9.956c-7.715,2.739-15.434,5.599-21.906,10.708c-2.742,2.116-5.478,5.474-4.733,9.208
		c1.125,4.356,5.356,6.97,9.09,8.96c9.208,4.733,19.54,6.846,29.625,8.714c25.511,4.11,51.527,4.235,77.167,2.488
		c27.141-2.115,54.148-6.594,80.411-14.313C337.932,362.342,330.836,358.479,324.864,352.88z M188.068,395.951
		c-6.97,1.99-14.066,4.357-19.79,8.957c-2.868,2.241-5.105,6.104-3.734,9.713c1.743,4.604,6.1,7.347,10.203,9.705
		c10.708,5.854,22.78,8.589,34.604,10.708c26.765,4.229,54.27,3.608,80.908-1.12c15.806-2.989,31.615-7.221,46.301-13.815
		c-9.584-3.984-18.917-8.467-27.878-13.693c-15.559,2.738-31.246,5.603-47.178,6.598c-21.032,1.618-42.319-0.125-63.355-2.738
		c-4.98-1.121-11.202-1.618-14.563-5.976C181.847,400.677,185.828,398.063,188.068,395.951z M358.345,475.982
		c17.424-3.604,34.977-7.719,50.908-15.806c4.976-2.867,11.076-5.979,12.698-11.95c0.87-5.725-5.105-8.714-9.337-11.08
		c2.613,2.993,4.356,7.347,1.74,10.83c-4.357,5.853-11.821,8.091-18.42,10.332c-20.66,5.85-42.072,8.216-63.355,10.582
		c-56.385,5.102-113.146,6.348-169.528,1.618c-18.92-1.994-38.217-4.109-56.264-10.829c-2.86-1.246-7.217-2.492-7.217-6.352
		c1.117-3.354,4.357-5.227,7.217-6.845c12.945-6.595,27.384-10.207,41.822-11.077c-4.228-2.491-9.208-2.738-14.062-2.613
		c-12.076,0.373-23.9,3.483-35.349,7.347c-9.834,3.604-19.916,7.59-27.76,14.811c-3.111,2.735-5.971,7.962-2.739,11.699
		c4.98,5.353,12.699,6.72,19.54,8.338c38.338,6.599,77.171,10.328,116.011,11.699C255.781,488.184,307.684,485.942,358.345,475.982z
		 M409.378,482.706c-23.402,7.468-47.672,11.574-71.822,14.936c-41.696,5.227-83.769,6.845-125.716,5.603
		c-25.515-0.995-51.03-2.738-76.176-6.974c5.85,3.984,13.071,5.227,19.794,7.096c28.257,5.976,57.255,7.096,86.01,7.966
		c42.19,0.748,84.387-0.87,125.962-7.468c19.669-3.48,39.459-7.715,57.13-16.927c9.215-4.854,18.552-12.326,20.163-23.152
		C435.391,473.741,421.951,478.349,409.378,482.706z"
              ></path>
            </g>
          </svg>
        </div>
      );
  }
};

export default CustomSVGs;

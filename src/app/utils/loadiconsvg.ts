export const iconDir = 'assets/icons'
export const loadIconSvg = (iconRegistry, sanitizer) => {
  iconRegistry.addSvgIcon(
    'anime',
    sanitizer.bypassSecurityTrustResourceUrl(`${iconDir}/anime.svg`));
  iconRegistry.addSvgIcon(
    'game',
    sanitizer.bypassSecurityTrustResourceUrl(`${iconDir}/game.svg`));
  iconRegistry.addSvgIcon(
    'music',
    sanitizer.bypassSecurityTrustResourceUrl(`${iconDir}/music.svg`));
  iconRegistry.addSvgIcon(
    'login',
    sanitizer.bypassSecurityTrustResourceUrl(`${iconDir}/login.svg`));
  iconRegistry.addSvgIcon(
    'sign',
    sanitizer.bypassSecurityTrustResourceUrl(`${iconDir}/sign.svg`));
    iconRegistry.addSvgIcon(
      'ok',
      sanitizer.bypassSecurityTrustResourceUrl(`${iconDir}/ok.svg`));
      iconRegistry.addSvgIcon(
        'arrow-right',
        sanitizer.bypassSecurityTrustResourceUrl(`${iconDir}/arrow-circle-right.svg`));

}

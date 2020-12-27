export interface IAppState {
  boardDimensionX: number;
  boardDimensionY: number;
  appLanguage: string;
}

const state: IAppState = {
  boardDimensionX: 48,
  boardDimensionY: 48,
  appLanguage: 'en'
}

export default state

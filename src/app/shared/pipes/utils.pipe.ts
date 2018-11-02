import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'utilsPipe'
})
export class UtilsPipe implements PipeTransform {
  private retorno: any = '';

  transform(value: any, args?: any): any {
    switch (args) {
      case 'gender':
        this.retorno = this.gender(value);
        break;
      case 'age':
        this.retorno = this.age(value);
        break;
      default:
        this.retorno = null;
    }
    return this.retorno;
  }


  gender(value) {
    switch (value) {
      case 'M':
        return 'Masculino';
      case 'F':
        return 'Feminino';
      default:
        return '';
    }
  }

  age(dtNascimento) {
    if (!isNullOrUndefined(dtNascimento)) {
      const rev = dtNascimento.split('/').reverse().join('-');
      const born = new Date(rev);

      const now = new Date();
      const yearNow = now.getFullYear();
      const monthNow = now.getMonth();
      const dateNow = now.getDate();
      const yearDob = born.getFullYear();
      const monthDob = born.getMonth();
      const dateDob = born.getDate();
      let yearAge = yearNow - yearDob;
      let dateAge;
      let monthAge;
      if (monthNow >= monthDob) {
        monthAge = monthNow - monthDob;
      } else {
        yearAge--;
        monthAge = 12 + monthNow - monthDob;
      }

      if (dateNow >= dateDob) {
        dateAge = dateNow - dateDob;
      } else {
        monthAge--;
        dateAge = 31 + dateNow - dateDob;

        if (monthAge < 0) {
          monthAge = 11;
          yearAge--;
        }

      }

      if (dateAge === 0 && monthAge === 0) {
        return yearAge + ' anos';
      } else if (monthAge === 0) {
        return yearAge + ' anos e ' + dateAge + ' dias';
      } else {
        return yearAge + ' anos e ' + monthAge + ' meses';
      }
    }
  }


}

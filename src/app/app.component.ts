import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  plainText = new FormControl('');
  emojiText = new FormControl('');
  emojiColor = new FormControl('white');
  emojiWordSpacing = new FormControl(3);

  ngOnInit() {
    merge(
      this.plainText.valueChanges,
      this.emojiColor.valueChanges,
      this.emojiWordSpacing.valueChanges
    )
      .pipe(debounceTime(500))
      .subscribe(() => this.convertToEmoji());
  }

  convertToEmoji() {
    const emojiTextValue = this.plainText.value
      .replaceAll(/[a-zA-Z]/g, `:alphabet-${this.emojiColor.value}-$&:`)
      .replaceAll('!', `:alphabet-${this.emojiColor.value}-exclamation:`)
      .replaceAll('?', `:alphabet-${this.emojiColor.value}-question:`)
      .replaceAll('@', `:alphabet-${this.emojiColor.value}-at:`)
      .replaceAll('#', `:alphabet-${this.emojiColor.value}-hash:`)
      .replaceAll(' ', Array(this.emojiWordSpacing.value).fill(' ').join(''));

    this.emojiText.setValue(emojiTextValue, { emitEvent: false });
  }

  copyToClipboard(textarea) {
    textarea.select();
    textarea.setSelectionRange(0, 99999);
    document.execCommand('copy');
    textarea.setSelectionRange(0, 0);
  }
}
